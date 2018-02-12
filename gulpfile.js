/**
 * Module Dependencies.
 */
const chalk = require('chalk'),
  gulp = require('gulp'),
  mocha = require('gulp-mocha'),
  mongooseService = require('./config/libraries/mongoose'),
  runSequence = require('run-sequence'),
  testFileGlobs = require('./config/assets/test'),
  testConfig = require('./config/env/test');


/**
 * Helpers
 */
function errorAlert(...rest) {
  rest.forEach((arg) => {
    /* eslint-disable no-console */
    if (typeof arg === 'object' && !(arg instanceof Array)) {
      console.error(chalk.redBright(`\n${JSON.stringify(arg, null, 2)}\n`));
    } else if (arg instanceof Array) {
      console.error(chalk.redBright(`\n${JSON.stringify(arg)}\n`));
    } else {
      console.error(chalk.red(arg));
    }
    /* eslint-enable */
  });
}

function logAlert(...rest) {
  rest.forEach((arg) => {
    /* eslint-disable no-console */
    if (typeof arg === 'object' && !(arg instanceof Array)) {
      console.log(chalk.white(`\n${JSON.stringify(arg, null, 2)}\n`));
    } else if (arg instanceof Array) {
      console.log(chalk.white(`\n${JSON.stringify(arg)}\n`));
    } else {
      console.log(chalk.yellow(arg));
    }
    /* eslint-enable */
  });
}


/**
 * Tasks.
 */
gulp.task('env:test', () => {
  process.env.NODE_ENV = 'test';
});

gulp.task('env:dev', () => {
  process.env.NODE_ENV = 'development';
});

gulp.task('dropDB', (done) => {
  mongooseService.connect(testConfig.db, (db, connectionError) => {
    if (connectionError) {
      errorAlert('Error connecting to test database:', connectionError);
      return;
    }

    db.dropDatabase((err) => {
      if (err) {
        errorAlert('Error dropping db:', err);
        return;
      }

      logAlert(`Successfully dropped db: ${db.databaseName}`);
      mongooseService.disconnect(done);
    });
  });
});

gulp.task('mocha', (done) => {
  const assetGlobs = Object.keys(testFileGlobs).map(key => testFileGlobs[key]),
    defaultConfig = require('./config/config'); // eslint-disable-line global-require

  mongooseService.connect(testConfig.db, (db, connectionError) => {
    if (connectionError) {
      errorAlert('Error connecting to test database: ', connectionError);
      return;
    }

    logAlert(`Connected to database: ${db.databaseName}`);
    mongooseService.loadModels(defaultConfig.paths.models);
    gulp.src(assetGlobs)
      .pipe(mocha({ exit: true }))
      .on('error', (mochaError) => {
        errorAlert('Error running mocha: ', mochaError);
        process.exit(1);
      });
    mongooseService.disconnect(done);
  });
});


/**
 * Sequences.
 */
gulp.task('default', (done) => {
  runSequence('env:test', 'dropDB', 'mocha', done);
});
