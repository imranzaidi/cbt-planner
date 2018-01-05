/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose');

/**
 * Stakeholders are key people related to a role.
 */

const StakeholderSchema = new mongoose.Schema({
  timestamps: true,
  title: {
    type: String,
    trim: true,
    required: 'Title cannot be blank.'
  }
});


module.exports = {
  name: 'Stakeholder',
  schema: StakeholderSchema
};
