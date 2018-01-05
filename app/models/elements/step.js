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
    required: 'Label cannot be blank.'
  },
  deadline: {
    type: Date,
    required: 'A deadline must be specified.'
  },
  complete: {
    type: Boolean,
    required: 'A step must be marked either as complete or incomplete.'
  }
});


module.exports = {
  name: 'Step',
  schema: StepSchema
};
