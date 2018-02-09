/***********************
 * Module Dependencies *
 ***********************/
const CONSTS = require('../consts/notes');


/**
 * Validates a note.
 *
 * @param {Object} note - payload to validate
 * @returns {*}
 */
function validateNote(note) {
  let errorMessage;

  if (note.content.length < 1) {
    errorMessage = CONSTS.ERRORS.EMPTY_STRING;
  } else if (note.content.length > 200) {
    errorMessage = CONSTS.ERRORS.MAX_LENGTH;
  }

  return errorMessage;
}


module.exports = {
  validateNote
};
