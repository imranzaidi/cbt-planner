/***********************
 * Module Dependencies *
 ***********************/
const chalk = require('chalk'),
  glob = require('glob');


/******************
 * Module Members *
 ******************/
const DEV = 'development',
  TEST = 'test',
  PROD = 'production',
  VALID_ENVIRONMENTS = Object.freeze([DEV, TEST, PROD]);


/**
 * Recursively deep freezes an object.
 *
 * @param {Object} o - object to freeze
 * @returns {Object} o - deep frozen object
 */
function deepFreeze(o) {
  Object.freeze(o);

  Object.keys(o).forEach((prop) => {
    const validType = typeof o[prop] === 'object' || typeof o[prop] === 'function';

    if (o[prop] !== null && validType && !Object.isFrozen(o[prop])) {
      deepFreeze(o[prop]);
    }
  });

  return o;
}

/**
 * Returns valid environment string; defaults to DEV if invalid or missing.
 *
 * @returns {String} * - the environment currently being used
 */
function getEnvironment() {
  if (VALID_ENVIRONMENTS.includes(process.env.NODE_ENV)) {
    return process.env.NODE_ENV;
  }

  process.env.NODE_ENV = DEV;
  return process.env.NODE_ENV;
}

/**
 * Generates a list of file paths based on the glob pattern passed in.
 *
 * @param globPattern {String} a glob pattern specifying how to find files
 * @returns {Array} a list of file paths
 */
function getFilePaths(globPattern) {
  return glob.sync(globPattern);
}

/**
 * Prints a list paths to console.
 *
 * @param paths {Array} a list of strings
 * @param label {String} a label specifying what is being printed and possibly why
 */
function outputPaths(paths, label) {
  /* eslint-disable no-console */
  console.info(chalk.yellow(`\n${label}:\n`));
  paths.forEach((path) => { console.info(`   ${chalk.white(path)}`); });
  /* eslint-enable */
}


module.exports = {
  deepFreeze,
  getEnvironment,
  getFilePaths,
  outputPaths
};
