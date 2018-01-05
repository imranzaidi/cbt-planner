/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose');


const GoalSchema = new mongoose.Schema({
  timestamps: true,
  label: {
    type: String,
    trim: true,
    required: 'Label cannot be blank.'
  },
  steps: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Step',
    required: 'You must specify steps needed to achieve this goal!'
  }],
  relatedValues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Value' }],
  relatedMissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mission' }],
  relatedRoles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
});


module.exports = {
  name: 'Goal',
  schema: GoalSchema
};
