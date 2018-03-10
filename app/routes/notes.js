/***********************
 * Module Dependencies *
 ***********************/
const notesController = require('../controllers/mongoose/notes'),
  tasksController = require('../controllers/mongoose/tasks');


module.exports = function bindRoutes(app) {
  app.route('/api/v1/tasks/:taskID/notes')
    .post(notesController.create);

  app.route('/api/v1/tasks/:taskID/notes/:noteID')
    .get(notesController.read)
    .put(notesController.update)
    .delete(notesController.destroy);

  app.param('taskID', tasksController.findTaskByID);
  app.param('noteID', notesController.findNoteByID);
};
