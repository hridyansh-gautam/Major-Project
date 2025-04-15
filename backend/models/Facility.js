const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Facility name is required'],
    trim: true
  },
  code: {
    type: String,
    required: [true, 'Facility code is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  type: {
    type: String,
    enum: ['Clinic', 'Hospital', 'Laboratory', 'Screening Center'],
    default: 'Clinic'
  },
  protocol: {
    type: String,
    enum: [
      'Two-Stage Manual',
      'Single-Stage Automated',
      'Hybrid Review',
      'Direct Reporting'
    ],
    default: 'Two-Stage Manual'
  },
  showInMatching: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Facility', FacilitySchema);