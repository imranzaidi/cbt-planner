/***********************
 * Module Dependencies *
 ***********************/
const controller = require('../controllers/planning');


// TODO: implement and refactor
module.exports = function bindRoute(app) {
  app.route('/api/v1/planning')
    .get(controller.read)
    .post(controller.create)
    .put(controller.update)
    .delete(controller.destroy);
};
