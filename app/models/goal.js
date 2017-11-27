/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose');


/**
 * Helper function for validating step object structure.
 *
 * @param step {Object} step to validate
 * @returns {boolean} true if invalid
 */
function stepIsInvalid(step) {
  const isObject = typeof step === 'object',
    descriptionIsString = typeof step['description'] === 'string',
    deadlineInstanceOfDate = step['deadline'] instanceof Date;

  return !(isObject && descriptionIsString && deadlineInstanceOfDate);
}

/**
 * Checks to see if steps are sorted by incrementing deadlines.
 *
 * @param steps {Array} sequence of steps
 * @returns {boolean} true if sorting is valid
 */
function stepsAreSortedByDeadline(steps) { // eslint-disable-line
  // TODO: Validate steps ordering based on incrementing deadline and remove lint disable.
  return true;
}

/**
 * Validates steps required to achieve a goal.
 *
 * @param steps {Array} an array of steps sequentially sorted by due date
 * @returns {boolean}
 */
function validateSteps(steps) {
  // steps not yet specified
  if (steps.length === 0) return true;

  const containInvalidStep = steps.some(step => stepIsInvalid(step));
  if (containInvalidStep) return false;

  return stepsAreSortedByDeadline(steps);
}


const GoalSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  },
  label: {
    type: String,
    default: 'New goal.',
    trim: true,
    required: 'Title cannot be blank'
  },
  steps: {
    type: Array,
    default: [],
    required: 'Please specify the steps necessary to achieve your goal.',
    validate: [validateSteps, 'Steps contains an invalid step object or are not ordered correctly.']
  }
});


module.exports = {
  name: 'Goal',
  schema: GoalSchema
};
