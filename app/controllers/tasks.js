/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose'),
  Task = mongoose.model('Task');


/**
 * Create a task.
 *
 * @param req {Object} express request object
 * @param res {Object} express response object
 */
function create(req, res) {
  const payload = req.body;
  if (!payload.description) {
    res.status(400).send({ error: 'Description cannot be empty.' });
  }

  const newTask = new Task(payload);

  newTask.save((err) => {
    if (err) return res.status(422).send(err);

    return res.status(201).json(newTask);
  });
}

/**
 * Read a task.
 *
 * @param req {Object} express request object
 * @param res {Object} express response object
 */
function read(req, res) {
  const { task } = req;
  res.status(200).json(task);
}

/**
 * Update a task.
 *
 * @param req {Object} express request object
 * @param res {Object} express response object
 */
function update(req, res) {
  const { task } = req;

  task.description = req.body.description;
  task.priority = req.body.priority;
  task.notes = req.body.notes;
  task.status = req.body.status;
  return task.save((err) => {
    if (err) return res.status(422).send({ message: 'Updated failed.' });

    return res.status(200).json(task);
  });
}

/**
 * Destroy a task.
 *
 * @param req {Object} express request object
 * @param res {Object} express response object
 */
function destroy(req, res) {
  const { task } = req;

  return task.remove((err) => {
    if (err) return res.status(422).send({ message: 'Delete failed.' });

    return res.sendStatus(204);
  });
}

/**
 * Helper middle-ware function to look up tasks by ID.
 *
 * @param req {Object} express request object
 * @param res {Object} express response object
 * @param next {Function} next function handler in express
 * @param id {String} task ID
 * @returns {*}
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
