/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose');


const GoalSchema = new mongoose.Schema({
  label: {
    type: String,
    trim: true,
    required: 'Label cannot be blank.'
  },
  steps: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Step' }],
  relatedValues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Value' }],
  relatedMissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mission' }],
  relatedRoles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
}, { timestamps: true });


module.exports = {
  name: 'Goal',
  schema: GoalSchema
};
