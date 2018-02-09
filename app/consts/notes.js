/***********************
 * Module Dependencies *
 ***********************/
const utils = require('../../config/libraries/utils');


const EMPTY_STRING = 'Note cannot be blank!',
  MAX_LENGTH = 'Note cannot be longer than 200 characters!',
  NO_ASSOCIATED_TASK = 'A note must have an associated task!',
  ERRORS = {
    EMPTY_STRING,
    MAX_LENGTH,
    NO_ASSOCIATED_TASK
  };


const exportedObject = utils.deepFreeze({ ERRORS });

module.exports = exportedObject;
