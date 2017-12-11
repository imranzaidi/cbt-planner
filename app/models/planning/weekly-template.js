/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose');


// TODO: implement
const WeeklyTemplateSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date
  }
});


module.exports = {
  name: 'WeeklyTemplate',
  schema: WeeklyTemplateSchema
};
