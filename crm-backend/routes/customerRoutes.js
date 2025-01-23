const express = require('express');
const { createCustomer, getCustomers, updateCustomer, deleteCustomer } = require('../controllers/customerController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

// Create a new customer
router.post('/', authenticate, createCustomer);

// Get a list of customers
router.get('/', authenticate, getCustomers);

// Update a customer
router.put('/:id', authenticate, updateCustomer);

// Delete a customer
router.delete('/:id', authenticate, deleteCustomer);

module.exports = router;
