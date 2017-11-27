/***********************
 * Module Dependencies *
 ***********************/
const winston = require('winston');


/******************
 * Module Members *
 ******************/
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      name: 'info-console',
      level: 'debug',
      colorize: true,
      showLevel: true,
      handleExceptions: true,
      json: true,
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


logger.stream = { write: (message) => { logger.info(message); } };


module.exports = logger;
