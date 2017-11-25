/*********************
 * Module Dependencies
 *********************/
const express = require('express'),
  bodyParser = require('body-parser'),
  app = express();


/****************
 * Module Members
 ****************/
const PORT = 8000;


// wire middle-ware
app.use(bodyParser.urlencoded({ extended: true }));

// load routes
// require('./app/routes')(app, {});

// start server
app.listen(PORT, () => {
  console.log('We are live on port', PORT);
});
