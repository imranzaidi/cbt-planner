/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose');

/**
 * Example usage:
 *
 * statement - simple missions statements, nothing fancy here. e.g. "I'm going to build a CBT planner app."
 *
 * Note: the context of a mission would be something like lifelong purpose, a daily habit, family and friends,
 *       career, broader , daily
 */

const MissionSchema = new mongoose.Schema({
  timestamps: true,
  statement: {
    type: String,
    trim: true,
    required: 'Mission statement cannot be blank.'
  }
});


module.exports = {
  name: 'Mission',
  schema: MissionSchema
};
