const { Customer } = require('../models');
const Joi = require('joi');
const { Sequelize } = require('sequelize');

//Create a new customer
const createCustomer = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        company: Joi.string().optional(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    if (!req.user || !req.user.id) {
        return res.status(400).json({ error: 'User ID is missing' });
    }

    try {
        const customer = await Customer.create({ ...value, user_id: req.user.id });
        res.status(201).json({ message: 'Customer created successfully', customer });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create customer', details: err.message });
    }
};


// Get a list of customers with optional filters for name, email, phone, company.
const getCustomers = async (req, res) => {
    const { name, email, phone, company, page = 1, limit = 10 } = req.query;

    const where = {};

    if (name) where.name = { [Sequelize.Op.like]: `%${name}%` }; 
    if (email) where.email = { [Sequelize.Op.like]: `%${email}%` }; 
    if (phone) where.phone = { [Sequelize.Op.like]: `%${phone}%` }; 
    if (company) where.company = { [Sequelize.Op.like]: `%${company}%` }; 

    try {
        const customers = await Customer.findAll({
            where,
            limit: parseInt(limit), 
            offset: (page - 1) * limit, 
        });
        
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch customers', details: err.message });
    }
};


// Update customer information
const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, company } = req.body;

    
    const schema = Joi.object({
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        phone: Joi.string().optional(),
        company: Joi.string().optional(),
    });

    const { error, value } = schema.validate({ name, email, phone, company });
    if (error) return res.status(400).json({ error: error.message });

    try {
        const customer = await Customer.findByPk(id);
        if (!customer) return res.status(404).json({ error: 'Customer not found' });

        
        await customer.update(value);
        res.status(200).json({ message: 'Customer updated successfully', customer });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update customer', details: err.message });
    }
};
// Delete a customer by ID
const deleteCustomer = async (req, res) => {
    const { id } = req.params;

    try {
        const customer = await Customer.findByPk(id);
        if (!customer) return res.status(404).json({ error: 'Customer not found' });

        
        await customer.destroy();
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete customer', details: err.message });
    }
};

module.exports = { createCustomer, getCustomers, updateCustomer, deleteCustomer };
