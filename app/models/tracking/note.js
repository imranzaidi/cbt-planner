/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose');


const NoteSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});


module.exports = {
  name: 'Note',
  schema: NoteSchema
};
