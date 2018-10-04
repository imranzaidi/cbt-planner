/**
 * Determines if the given date is the start of the week (Monday).
 *
 * @param {Object} date - date to check
 * @returns {boolean} - true if the day is Monday.
 */
function isBeginningOfWeek(date) {
  if (!(date instanceof Date)) {
    throw new TypeError('Argument date needs to be of type Date!');
  }

  return date.getDay() === 1;
}

/**
 * Determines if the given date is the start of the month (1st).
 *
 * @param {Object} date - date to check
 * @returns {boolean} - true if it's the 1st of the month
 */
function isBeginningOfMonth(date) {
  if (!(date instanceof Date)) {
    throw new TypeError('Argument date needs to be of type Date!');
  }

  return date.getDate() === 1;
}


module.exports = {
  isBeginningOfWeek,
  isBeginningOfMonth
};
