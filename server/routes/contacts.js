const express = require('express');
const { pool } = require('../config/database');

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: 'Connected'
  });
});

// GET all contacts
router.get('/contacts', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts',
      error: error.message
    });
  }
});

// GET single contact by ID
router.get('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute(
      'SELECT * FROM contacts WHERE id = ?',
      [id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact',
      error: error.message
    });
  }
});

// POST create new contact
router.post('/contacts/create', async (req, res) => {
  try {
    const { name, email, phone, age } = req.body;
    
    // Validation
    if (!name || !email || !phone || !age) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, phone, age) are required'
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    // Age validation
    if (age < 0 || age > 150) {
      return res.status(400).json({
        success: false,
        message: 'Age must be between 0 and 150'
      });
    }
    
    const [result] = await pool.execute(
      'INSERT INTO contacts (name, email, phone, age) VALUES (?, ?, ?, ?)',
      [name, email, phone, age]
    );
    
    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      data: {
        id: result.insertId,
        name,
        email,
        phone,
        age
      }
    });
  } catch (error) {
    console.error('Error creating contact:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to create contact',
      error: error.message
    });
  }
});

// PUT update contact
router.put('/contacts/edit/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, age } = req.body;
    
    // Validation
    if (!name || !email || !phone || !age) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, phone, age) are required'
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }
    
    // Age validation
    if (age < 0 || age > 150) {
      return res.status(400).json({
        success: false,
        message: 'Age must be between 0 and 150'
      });
    }
    
    const [result] = await pool.execute(
      'UPDATE contacts SET name = ?, email = ?, phone = ?, age = ? WHERE id = ?',
      [name, email, phone, age, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: {
        id: parseInt(id),
        name,
        email,
        phone,
        age
      }
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to update contact',
      error: error.message
    });
  }
});

// DELETE contact
router.delete('/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [result] = await pool.execute(
      'DELETE FROM contacts WHERE id = ?',
      [id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact',
      error: error.message
    });
  }
});

// Search contacts
router.get('/contacts/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const [rows] = await pool.execute(
      'SELECT * FROM contacts WHERE name LIKE ? OR email LIKE ? OR phone LIKE ? ORDER BY created_at DESC',
      [`%${query}%`, `%${query}%`, `%${query}%`]
    );
    
    res.json({
      success: true,
      data: rows,
      count: rows.length,
      query
    });
  } catch (error) {
    console.error('Error searching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search contacts',
      error: error.message
    });
  }
});

module.exports = router;
