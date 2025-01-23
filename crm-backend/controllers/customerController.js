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
        // Add the user_id explicitly when creating the customer
        const customer = await Customer.create({ ...value, user_id: req.user.id });
        res.status(201).json({ message: 'Customer created successfully', customer });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create customer', details: err.message });
    }
};


// Get a list of customers with optional filters for name, email, etc.
const getCustomers = async (req, res) => {
    const { name, email, phone, company, page = 1, limit = 10 } = req.query;

    // Initialize the `where` object for Sequelize query
    const where = {};

    // Apply filters based on query parameters
    if (name) where.name = { [Sequelize.Op.like]: `%${name}%` }; // Using LIKE for partial name match
    if (email) where.email = { [Sequelize.Op.like]: `%${email}%` }; // Using LIKE for partial email match
    if (phone) where.phone = { [Sequelize.Op.like]: `%${phone}%` }; // Using LIKE for partial phone match
    if (company) where.company = { [Sequelize.Op.like]: `%${company}%` }; // Using LIKE for partial company match

    try {
        // Find customers based on the filters and pagination
        const customers = await Customer.findAll({
            where,
            limit: parseInt(limit), // Limit results per page
            offset: (page - 1) * limit, // Pagination offset
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

    // Validate the input
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

        // Update the customer details
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

        // Delete the customer
        await customer.destroy();
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete customer', details: err.message });
    }
};

module.exports = { createCustomer, getCustomers, updateCustomer, deleteCustomer };
