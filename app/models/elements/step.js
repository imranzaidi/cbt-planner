/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose');


const StepSchema = new mongoose.Schema({
  timestamps: true,
  description: {
    type: String,
    trim: true,
    minlength: 1,
    maxlength: 200,
    required: 'Description cannot be blank.'
  },
  deadline: {
    type: Date,
    required: 'A deadline must be specified.'
  },
  complete: {
    type: Boolean,
    required: 'Completed flag is required.'
  },
  goal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal',
    required: 'A step must be associated with a goal!'
  }
});


module.exports = {
  name: 'Step',
  schema: StepSchema
};
