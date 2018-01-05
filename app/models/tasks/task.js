/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose');


/******************
 * Module Members *
 ******************/
const VALID_PRIORITIES = ['a', 'b', 'c'],
  VALID_STATUSES = ['incomplete', 'in progress', 'completed', 'forwarded'];


const TaskSchema = new mongoose.Schema({
  timestamps: true,
  description: {
    type: String,
    trim: true,
    required: 'Task description cannot be blank'
  },
  priority: {
    type: String,
    default: 'a',
    enum: VALID_PRIORITIES,
    required: 'Please assign a priority.'
  },
  status: {
    type: String,
    default: 'incomplete',
    enum: VALID_STATUSES,
    required: 'Please assign a priority.'
  },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
});


module.exports = {
  name: 'Task',
  schema: TaskSchema
};
