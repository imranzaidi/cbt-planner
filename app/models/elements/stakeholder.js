/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose');

/**
 * Stakeholders are key people related to a role.
 */

const StakeholderSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: 'Title cannot be blank.'
  }
}, { timestamps: true });


module.exports = {
  name: 'Stakeholder',
  schema: StakeholderSchema
};
