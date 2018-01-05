/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose');


/******************
 * Module Members *
 ******************/
const BLANK_ERROR = 'Note cannot be blank!';


const NoteSchema = new mongoose.Schema({
  timestamps: true,
  content: {
    type: String,
    trim: true,
    minlength: [1, BLANK_ERROR],
    maxlength: [200, 'Note cannot be longer than 200 characters!'],
    required: BLANK_ERROR
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: 'A note must have an associated task!'
  }
});


module.exports = {
  name: 'Note',
  schema: NoteSchema
};
