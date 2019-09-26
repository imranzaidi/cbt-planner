/***********************
 * Module Dependencies *
 ***********************/
const { UserInputError } = require('apollo-server-express'),
  jsonwebtoken = require('jsonwebtoken'),
  { errorMessages } = require('../../app/consts/loginRegistration'),
  { Query, Mutation } = require('../../app/resolvers/LoginRegister'),
  {
    sequelizeService,
    setupDatabase,
    connect,
    closeConnection
  } = require('../../tools/testDBSetup');

let context;
const SECRET = 'don\'t tell anyone!';

// TODO: Add tests for verifying and setting token via cookies


describe('LoginRegister resolvers', () => {
  beforeAll(async () => {
    await setupDatabase();
    await connect();

    context = {
      models: sequelizeService.models,
      SECRET,
      res: { cookie: (cookieName, cookieValue, cookieProps) => {} }, // eslint-disable-line no-unused-vars
      req: { header: { authorization: '' } }
    };
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('let\'s new users register', async () => {
    const parent = {};
    const args = {
      username: 'new user',
      email: 'new@user.com',
      password: 'password'
    };

    const result = await Mutation.register(parent, args, context);
    expect(result.username).toBe(args.username);
    expect(result.email).toBe(args.email);
    expect(result).toHaveProperty('id');
  });

  it('let\'s existing users login and returns a jsonwebtoken', async () => {
    const parent = {};
    const loginArgs = {
      email: 'new@user.com',
      password: 'password'
    };

    const token = await Mutation.login(parent, loginArgs, context);
    const { user } = await jsonwebtoken.verify(token, SECRET);

    expect(typeof token).toBe('string');
    expect(user).toHaveProperty('email', loginArgs.email);
    expect(user).toHaveProperty('username', 'new user');
    expect(user).not.toHaveProperty('password');
    expect(user).toHaveProperty('id');
  });

  it('validates json web-tokens', async () => {
    const parent = {};
    const loginArgs = {
      email: 'new@user.com',
      password: 'password'
    };

    const token = await Mutation.login(parent, loginArgs, context);
    let result = await Query.verifyToken(parent, { token }, context);
    expect(typeof result.exp).toBe('number');
    expect(typeof result.iat).toBe('number');
    expect(result.exp).not.toBe(0);
    expect(result.iat).not.toBe(0);
    expect(result.user).toHaveProperty('id');
    expect(result.user).toHaveProperty('email');
    expect(result.user).toHaveProperty('username');

    const badToken = 'blah';
    result = await Query.verifyToken(parent, { token: badToken }, context);
    expect(result.user).toBeNull();
    expect(result.exp).toBe(0);
    expect(result.iat).toBe(0);
  });

  it('throws an error if users try to login with out an email', async () => {
    const parent = {};
    const loginArgs = {
      email: null,
      password: 'password'
    };

    expect.assertions(1);
    try {
      await Mutation.login(parent, loginArgs, context);
    } catch (e) {
      expect(e.message).toBe(errorMessages.emailLookUp);
    }
  });

  it('throws an error if users try to login with a bad password', async () => {
    const parent = {};
    const loginArgs = {
      email: 'new@user.com',
      password: 'wrong password'
    };

    expect.assertions(1);
    try {
      await Mutation.login(parent, loginArgs, context);
    } catch (e) {
      expect(e.message).toBe(errorMessages.incorrectPassword);
    }
  });

  it('throws an error if user tries to sign up with a bad email', async () => {
    const parent = {};
    const loginArgs = {
      email: 'you know I\'m bad!',
      password: 'badass password'
    };

    expect.assertions(2);
    try {
      await Mutation.register(parent, loginArgs, context);
    } catch (e) {
      expect(e.message).toBe(errorMessages.invalidEmail);
      expect(e instanceof UserInputError).toBeTruthy();
    }
  });

  it('throws an error if user tries to sign up with a blank password', async () => {
    const parent = {};
    const loginArgs = {
      email: 'another@user.com',
      password: ''
    };

    expect.assertions(2);
    try {
      await Mutation.register(parent, loginArgs, context);
    } catch (e) {
      expect(e.message).toBe(errorMessages.missingPassword);
      expect(e instanceof UserInputError).toBeTruthy();
    }
  });

  it('throws an error if the password smaller than 8 characters', async () => {
    const parent = {};
    const loginArgs = {
      email: 'another@user.com',
      password: 'passwor'
    };

    expect.assertions(2);
    try {
      await Mutation.register(parent, loginArgs, context);
    } catch (e) {
      expect(e.message).toBe(errorMessages.invalidPasswordLength);
      expect(e instanceof UserInputError).toBeTruthy();
    }
  });
});
