/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose'),
  Task = mongoose.model('Task'),
  lib = require('../libraries/tasks');


/**
 * Create a task.
 *
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 */
function create(req, res) {
  const payload = req.body,
    errorMessage = lib.validateTask(payload);

  if (errorMessage) {
    return res.status(400).send({ error: errorMessage });
  }

  const newTask = new Task(payload);
  return newTask.save((err) => {
    if (err) return res.status(500).send({ error: 'Error creating task.' });

    return res.status(201).json(newTask);
  });
}

/**
 * Read a task.
 *
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 */
function read(req, res) {
  const { task } = req;
  res.status(200).json(task);
}

/**
 * Update a task.
 *
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 */
function update(req, res) {
  const payload = req.body,
    errorMessage = lib.validateTask(payload);

  if (errorMessage) {
    return res.status(400).send({ error: errorMessage });
  }

  const { task } = req;
  console.log('> task (update):', task);

  task.description = req.body.description;
  task.priority = req.body.priority;
  task.notes = req.body.notes;
  task.status = req.body.status;

  return task.save((err) => {
    if (err) return res.status(500).send({ error: err });

    return res.status(200).json(task);
  });
}

/**
 * Destroy a task.
 *
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 */
function destroy(req, res) {
  const { task } = req;

  return task.remove((err) => {
    if (err) return res.status(500).send({ message: 'Delete failed.' });

    return res.sendStatus(204);
  });
}

/**
 * Helper middle-ware function to look up tasks by ID.
 *
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 * @param {Function} next - next function handler in express
 * @param {String} id - task ID
 * @returns {*} void
 */
function findTaskByID(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Task ID is invalid.'
    });
  }

  return Task.findById(id).exec((err, task) => {
    if (err) return next(err);
    else if (!task) {
      return res.status(404).send({
        message: 'No task associated with that ID was found.'
      });
    }
    req.task = task;
    return next();
  });
}


module.exports = {
  create,
  read,
  update,
  destroy,
  findTaskByID
};
