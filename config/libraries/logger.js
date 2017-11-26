/***********************
 * Module Dependencies *
 ***********************/
const winston = require('winston');


/******************
 * Module Members *
 ******************/
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      name: 'info-console',
      level: 'info',
      colorize: true,
      showLevel: true,
      handleExceptions: true,
      humanReadableUnhandledException: true
    }),
    new (winston.transports.File)({
      name: 'info-file',
      level: 'info',
      showLevel: true,
      filename: 'info.log'
    }),
    new (winston.transports.File)({
      name: 'error-file',
      level: 'error',
      showLevel: true,
      filename: 'errors.log'
    })
  ],
  exitOnError: false
});


module.exports = logger;
