/***********************
 * Module Dependencies *
 ***********************/
const utils = require('../../config/libraries/utils'),
  validation = require('../libraries/validation-utils');


const VALID_PRIORITIES = ['a', 'b', 'c'],
  VALID_STATUSES = ['incomplete', 'in progress', 'completed', 'forwarded'],
  ERRORS = {
    DESCRIPTION: 'Description cannot be blank.',
    PRIORITY: `Please assign a priority. Valid values are ${validation.optionsToString(VALID_PRIORITIES)}.`,
    STATUS: `Task status is required. Valid value are ${validation.optionsToString(VALID_STATUSES)}.`
  };


const exportedObject = utils.deepFreeze({
  VALID_PRIORITIES,
  VALID_STATUSES,
  ERRORS
});

module.exports = exportedObject;
