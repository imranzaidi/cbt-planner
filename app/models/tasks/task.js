/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose');


/******************
 * Module Members *
 ******************/
const VALID_PRIORITIES = ['a', 'b', 'c'],
  VALID_STATUSES = ['incomplete', 'in progress', 'completed', 'forwarded'];


/**
 * Validated priority level.
 *
 * @param {String} priority - priority level
 * @returns {boolean} true if valid
 */
function isValidPriority(priority) {
  return VALID_PRIORITIES.includes(priority);
}

/**
 * Valid task status.
 *
 * @param {String} status - task status
 * @returns {boolean} true if valid
 */
function isValidStatus(status) {
  return VALID_STATUSES.includes(status);
}

/**
 * Helper function to converts options to a human readable string.
 *
 * @param {Array} a - a list of options (strings)
 * @returns {String} a human readable output string
 */
function optionsToString(a) {
  const beginning = a.slice(0, a.length - 1),
    end = a[a.length - 1];

  return `${beginning.join(', ')} or ${end}`;
}


const TaskSchema = new mongoose.Schema({
  timestamps: true,
  description: {
    type: String,
    default: 'New task',
    trim: true,
    required: 'Task description cannot be blank'
  },
  priority: {
    type: String,
    default: 'a',
    required: 'Please assign a priority.',
    validate: [isValidPriority, `Priority must be ${optionsToString(VALID_PRIORITIES)}.`]
  },
  status: {
    type: String,
    default: 'incomplete',
    required: 'Please assign a priority.',
    validate: [isValidStatus, `Status must be ${optionsToString(VALID_STATUSES)}.`]
  },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
});


module.exports = {
  name: 'Task',
  schema: TaskSchema
};
