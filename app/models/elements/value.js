/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose');

/**
 * Governing values form the foundation, enabling you to realize the type of life you want to live.
 *
 * Example usage:
 *
 * category - personal
 * valueStatement - I value integrity
 * description - Intellectual honesty is a function of critical thought and rational analysis
 */

const CATEGORIES = ['personal', 'interpersonal', 'health and well-being', 'professional', 'financial'];

const ValueSchema = new mongoose.Schema({
  timestamps: true,
  category: {
    type: String,
    enum: CATEGORIES,
    trim: true,
    required: 'Category cannot be blank.'
  },
  valueStatement: {
    type: String,
    trim: true,
    required: 'Value statement cannot be blank.'
  },
  description: {
    type: String,
    trim: true,
    required: 'Description cannot be blank.'
  }
});


module.exports = {
  name: 'Value',
  schema: ValueSchema
};
