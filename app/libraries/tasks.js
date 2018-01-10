/***********************
 * Module Dependencies *
 ***********************/
const CONSTS = require('../consts/task');


/**
 * Validates a task.
 *
 * @param {Object} task - payload to validate
 * @returns {string} * - a detailed error message, empty string if no errors
 */
function validateTask(task) {
  const errorMessage = [];

  if (!task.description) {
    errorMessage.push(CONSTS.ERRORS.DESCRIPTION);
  }
  const isValidPriority = CONSTS.VALID_PRIORITIES.some(priority => priority === task.priority);
  if (!task.priority || !isValidPriority) {
    errorMessage.push(CONSTS.ERRORS.PRIORITY);
  }
  const isValidStatus = CONSTS.VALID_STATUSES.some(status => status === task.status);
  if (!task.status || !isValidStatus) {
    errorMessage.push(CONSTS.ERRORS.STATUS);
  }

  return errorMessage.join(' ');
}


module.exports = {
  validateTask
};
