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

// Get all facilities
router.get('/', async (req, res) => {
  try {
    const facilities = await Facility.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: facilities.length,
      facilities
    });
  } catch (error) {
    console.error('Error fetching facilities:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// Delete a facility
router.delete('/:id', async (req, res) => {
  try {
    const facility = await Facility.findByIdAndDelete(req.params.id);
    
    if (!facility) {
      return res.status(404).json({
        success: false,
        message: 'Facility not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Facility deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting facility:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;