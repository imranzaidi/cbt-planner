/**
 * Helper function to converts options to a human readable string.
 *
 * @param {Array} a - a list of options (strings)
 * @returns {String} a human readable output string of all options
 */
function optionsToString(a) {
  if (a.length === 0) return '';
  if (a.length === 1) return `'${a[0]}'`;

  const beginning = a.slice(0, a.length - 1),
    lastValue = a[a.length - 1],
    values = beginning.map(value => `'${value}'`);

  return `${values.join(', ')} or '${lastValue}'`;
}


module.exports = {
  optionsToString
};
