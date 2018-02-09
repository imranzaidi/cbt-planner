/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose'),
  CONSTS = require('../../consts/notes');


const NoteSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
    minlength: [1, CONSTS.ERRORS.EMPTY_STRING],
    maxlength: [200, CONSTS.ERRORS.MAX_LENGTH],
    required: CONSTS.ERRORS.EMPTY_STRING
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: CONSTS.ERRORS.NO_ASSOCIATED_TASK
  }
}, { timestamps: true });


module.exports = {
  name: 'Note',
  schema: NoteSchema
};
