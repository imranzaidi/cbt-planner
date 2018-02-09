/**
 * Module Dependencies.
 */
const chalk = require('chalk'),
  defaultConfig = require('./config/config'),
  gulp = require('gulp'),
  mocha = require('gulp-mocha'),
  mongooseService = require('./config/libraries/mongoose'),
  runSequence = require('run-sequence'),
  testFileGlobs = require('./config/assets/test'),
  testConfig = require('./config/env/test');


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
      console.error(chalk.red('Error connecting to test database: ', connectionError));
    } else {
      db.dropDatabase((err) => {
        if (err) {
          console.error(chalk.red('Error dropping db:', err));
        } else {
          console.log(chalk.yellow('Successfully dropped db: ', db.databaseName));
        }

        mongooseService.disconnect(done);
      });
    }
  });
});

gulp.task('mocha', (done) => {
  const assetGlobs = Object.keys(testFileGlobs).map(key => testFileGlobs[key]);

  console.log('assetGlobs:', assetGlobs);
  mongooseService.connect(testConfig.db, (db, connectionError) => {
    if (connectionError) {
      console.error(chalk.red('Error connecting to test database: ', connectionError));
    } else {
      console.log(chalk.yellow('Connected to database:', db.databaseName));

      mongooseService.loadModels(defaultConfig.paths.models);
      gulp.src(assetGlobs)
        .pipe(mocha({ exit: true }))
        .on('error', (mochaError) => {
          console.error(chalk.red('Error running mocha: ', mochaError));
          process.exit(1);
        });
      mongooseService.disconnect(done);
    }
  });
});


/**
 * Sequences.
 */
gulp.task('default', (done) => {
  runSequence('env:test', 'dropDB', 'mocha', done);
});
