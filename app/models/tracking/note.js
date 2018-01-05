/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose');


// TODO: implement
const NoteSchema = new mongoose.Schema({
  timestamps: true
});


module.exports = {
  name: 'Note',
  schema: NoteSchema
};
