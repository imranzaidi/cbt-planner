/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose'),
  CONSTS = require('../../../consts/task');


const TaskSchema = new mongoose.Schema({
  description: {
    type: String,
    minlength: 1,
    maxlength: 200,
    trim: true,
    required: CONSTS.ERRORS.DESCRIPTION
  },
  priority: {
    type: String,
    default: 'a',
    enum: CONSTS.VALID_PRIORITIES,
    required: CONSTS.ERRORS.PRIORITY
  },
  status: {
    type: String,
    default: 'incomplete',
    enum: CONSTS.VALID_STATUSES,
    required: CONSTS.ERRORS.STATUS
  },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
}, { timestamps: true });


module.exports = {
  name: 'Task',
  schema: TaskSchema
};
