/***********************
 * Module Dependencies *
 ***********************/
const controller = require('../controllers/tasks');


module.exports = function bindRoute(app) {
  app.route('/api/v1/tasks')
    .get(controller.read)
    .post(controller.create)
    .put(controller.update)
    .delete(controller.destroy);
};
