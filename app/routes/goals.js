/***********************
 * Module Dependencies *
 ***********************/
const controller = require('../controllers/mongoose/goals');


// TODO: implement and refactor
module.exports = function bindRoute(app) {
  app.route('/api/v1/goals')
    .get(controller.read)
    .post(controller.create)
    .put(controller.update)
    .delete(controller.destroy);
};
