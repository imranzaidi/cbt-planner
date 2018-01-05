/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose');


/**
 * Helper function for validating step object structure.
 *
 * @param {Object} step - step to validate
 * @returns {boolean} true if invalid
 */
function stepIsValid(step) {
  const isObject = typeof step === 'object',
    hasValidDescription = typeof step.description === 'string',
    hasValidDeadline = step.deadline instanceof Date && !isNaN(step.deadline.getDate()),
    hasCompletedFlag = typeof step.completed === 'boolean';

  return isObject && hasValidDescription && hasValidDeadline && hasCompletedFlag;
}

/**
 * Checks to see if steps are sorted by incrementing deadlines.
 *
 * @param {Array} steps - sequence of steps
 * @returns {boolean} true if sorting is valid
 */
function stepsAreSortedByDeadline(steps) {
  return steps.every((val, index) => index === 0 || steps[index - 1].getTime() < steps[index].getTime());
}

/**
 * Validates steps required to achieve a goal.
 *
 * @param {Array} steps - a list of steps (should be sequentially sorted by due date)
 * @returns {boolean}
 */
function validateSteps(steps) {
  if (steps.length === 0) return true;
  if (steps.some(step => !stepIsValid(step))) return false;

  return stepsAreSortedByDeadline(steps);
}


const GoalSchema = new mongoose.Schema({
  timestamps: true,
  label: {
    type: String,
    default: 'New goal',
    trim: true,
    required: 'Label cannot be blank.'
  },
  steps: {
    type: Array,
    default: [],
    required: 'Please specify the steps necessary to achieve your goal.',
    validate: [validateSteps, 'Steps contains an invalid step object or are not ordered correctly.']
  },
  relatedValues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Value' }],
  relatedMissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mission' }],
  relatedRoles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }]
});


module.exports = {
  name: 'Goal',
  schema: GoalSchema
};
