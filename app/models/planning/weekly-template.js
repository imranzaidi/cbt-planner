/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose');


// TODO: implement
const WeeklyTemplateSchema = new mongoose.Schema({
  timestamps: true
});


module.exports = {
  name: 'WeeklyTemplate',
  schema: WeeklyTemplateSchema
};
