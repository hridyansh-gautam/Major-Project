const express = require('express');
const router = express.Router();
const Facility = require('../models/Facility');

// Create new facility
router.post('/', async (req, res) => {
  try {
    const { name, code, type, protocol, showInMatching } = req.body;
    
    // Validation
    if (!name || !code) {
      return res.status(400).json({ 
        success: false,
        message: 'Facility name and code are required' 
      });
    }

    // Check for existing facility with same code
    const existingFacility = await Facility.findOne({ code });
    if (existingFacility) {
      return res.status(400).json({
        success: false,
        message: 'Facility with this code already exists'
      });
    }

    // Create new facility
    const newFacility = new Facility({
      name,
      code,
      type,
      protocol,
      showInMatching
    });

    await newFacility.save();
    
    res.status(201).json({
      success: true,
      message: 'Facility created successfully',
      facility: newFacility
    });
    
  } catch (error) {
    console.error('Error creating facility:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;