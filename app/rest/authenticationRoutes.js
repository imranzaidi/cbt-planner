/***********************
 * Module Dependencies *
 ***********************/
const _ = require('lodash'),
  bcrypt = require('bcrypt'),
  jsonwebtoken = require('jsonwebtoken'),
  config = require('../../config/config'),
  { errorMessages, errorTypes } = require('../consts/loginRegistration'),
  { LOGIN_ROUTE, LOGOUT_ROUTE, VERIFY_JWT_ROUTE } = require('../consts/routes');


module.exports = function bindRoutes(app, sequelizeService) {
  // route for securely integrating authentication on the client-side
  app.post(LOGIN_ROUTE, async (req, res) => {
    const { email, password } = req.body;
    const user = await sequelizeService.models.User.findOne({ where: { email } });
    if (!user) {
      const error = { message: errorMessages.emailLookUp, name: errorTypes.login };
      return res.status(422).send({ error, success: false, user: null });
    }

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      const error = { message: errorMessages.incorrectPassword, name: errorTypes.login };
      return res.status(422).send({ error, success: false, user: null });
    }

    const safeUserObject = _.pick(user, ['id', 'username', 'email']);

    const token = jsonwebtoken.sign(
      { user: safeUserObject },
      config.app.secret,
      { expiresIn: '2h' },
    );

    res.cookie('id', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 // 2 hours
    });

    return res.status(200).send({ message: 'Authenticated.', success: true, user: safeUserObject });
  });

  app.post(LOGOUT_ROUTE, (req, res) => {
    res.clearCookie('id');
    return res.status(200).send({ message: 'Logged Out.' });
  });

  app.get(VERIFY_JWT_ROUTE, async (req, res) => {
    const token = req.headers.authorization || req.cookies.id;
    try {
      const tokenContent = await jsonwebtoken.verify(token, config.app.secret);
      return res.status(200).send(tokenContent);
    } catch (error) {
      return res.status(422).send({
        user: null,
        exp: 0,
        iat: 0,
        error
      });
    }
  });
};
