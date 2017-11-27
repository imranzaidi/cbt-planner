/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose');


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
