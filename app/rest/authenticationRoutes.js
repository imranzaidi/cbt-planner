/***********************
 * Module Dependencies *
 ***********************/
const _ = require('lodash'),
  bcrypt = require('bcrypt'),
  jsonwebtoken = require('jsonwebtoken'),
  config = require('../../config/config'),
  { errorMessages } = require('../consts/loginRegistration'),
  { LOGIN_ROUTE, VERIFY_JWT_ROUTE } = require('../consts/routes');


module.exports = function bindRoutes(app, sequelizeService) {
  // route for securely integrating authentication on the client-side
  app.post(LOGIN_ROUTE, async (req, res) => {
    const { email, password } = req.body;
    const user = await sequelizeService.models.User.findOne({ where: { email } });
    if (!user) {
      return res.status(422).send({ error: errorMessages.emailLookUp });
    }

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.status(422).send({ error: errorMessages.incorrectPassword });
    }

    const token = jsonwebtoken.sign(
      { user: _.pick(user, ['id', 'username', 'email']) },
      config.app.secret,
      { expiresIn: '2h' },
    );

    res.cookie('id', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 // 2 hours
    });

    return res.status(200).send({ message: 'Authenticated.' });
  });

  app.get(VERIFY_JWT_ROUTE, async (req, res) => {
    const token = req.headers.authorization || req.cookies.id;
    try {
      const tokenContent = await jsonwebtoken.verify(token, config.app.secret);
      res.status(200);
      return res.send(tokenContent);
    } catch (error) {
      res.status(422);
      return res.send({
        user: null,
        exp: 0,
        iat: 0,
        error
      });
    }
  });
};
