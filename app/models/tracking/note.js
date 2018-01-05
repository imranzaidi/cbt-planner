/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose');


/***********
 * Helpers *
 ***********/

const validateContent = content => content.length <= 200 && content.length !== 0;


const NoteSchema = new mongoose.Schema({
  timestamps: true,
  content: {
    type: String,
    trim: true,
    required: 'Note content cannot be blank!',
    validate: [validateContent, 'Note cannot be longer than 200 characters!']
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
