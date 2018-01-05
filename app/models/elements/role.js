/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose');

/**
 * Example usage:
 *
 * title - Engineer
 * clarifyingStatements - I am creative, adaptive, efficient and thorough. I use the right
 *                        tools, methodologies and paradigms to solve complex problems and
 *                        deliver solutions that add value.
 * stakeholders - Myself, Co-workers, Users
 */

const RoleSchema = new mongoose.Schema({
  timestamps: true,
  title: {
    type: String,
    trim: true,
    required: 'Title cannot be blank.'
  },
  clarifyingStatements: {
    type: String,
    trim: true,
    required: 'Clarifying statements cannot be blank.'
  },
  stakeholders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stakeholder' }]
});


module.exports = {
  name: 'Role',
  schema: RoleSchema
};
