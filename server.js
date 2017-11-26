/***********************
 * Module Dependencies *
 ***********************/
const chalk = require('chalk'),
  express = require('express'),
  bodyParser = require('body-parser'),
  config = require('./config/config');


/******************
 * Module Members *
 ******************/
const PORT = config.app.port,
  // ROOT_PATH = __dirname,
  app = express();


// wire middle-ware
app.use(bodyParser.urlencoded({ extended: true }));

// load routes
// require('./app/routes')(app, {});

// TODO: Load models and / or setup db instance.

// start server
app.listen(PORT, () => {
  console.info(chalk.blue(`We are live on port ${PORT}:`));
});
