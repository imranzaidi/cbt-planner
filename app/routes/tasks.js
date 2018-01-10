/***********************
 * Module Dependencies *
 ***********************/
const controller = require('../controllers/tasks');


module.exports = function bindRoutes(app) {
  app.route('/api/v1/tasks')
    .post(controller.create);

  app.route('/api/v1/tasks/:taskID')
    .get(controller.read)
    .put(controller.update)
    .delete(controller.destroy);

  app.param('taskID', controller.findTaskByID);
};
