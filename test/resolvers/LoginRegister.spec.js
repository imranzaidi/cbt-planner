/***********************
 * Module Dependencies *
 ***********************/
const { UserInputError } = require('apollo-server-express'),
  jsonwebtoken = require('jsonwebtoken'),
  { Query, Mutation } = require('../../app/resolvers/LoginRegister'),
  {
    sequelizeService,
    setupDatabase,
    connect,
    closeConnection
  } = require('../../tools/testDBSetup');

let context;
const SECRET = 'don\'t tell anyone!';


describe('LoginRegister resolvers', () => {
  beforeAll(async () => {
    await setupDatabase();
    await connect();

    context = {
      models: sequelizeService.models,
      SECRET
    };
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('tells you the purpose of the endpoint when queried (coverage)', async () => {
    const result = await Query.purpose();
    expect(result).toBe('Login / Register');
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

  it('throws an error if users try to login with out an email', async () => {
    const parent = {};
    const loginArgs = {
      email: null,
      password: 'password'
    };

    try {
      await Mutation.login(parent, loginArgs, context);
    } catch (e) {
      expect(e.message).toBe('No user with that email.');
    }
  });

  it('throws an error if users try to login with a bad password', async () => {
    const parent = {};
    const loginArgs = {
      email: 'new@user.com',
      password: 'wrong password'
    };

    try {
      await Mutation.login(parent, loginArgs, context);
    } catch (e) {
      expect(e.message).toBe('Incorrect password.');
    }
  });

  it('throws an error if user tries to sign up with a bad email', async () => {
    const parent = {};
    const loginArgs = {
      email: 'you know I\'m bad!',
      password: 'badass password'
    };

    try {
      await Mutation.register(parent, loginArgs, context);
    } catch (e) {
      expect(e.message).toBe('Invalid email!');
      expect(e instanceof UserInputError).toBeTruthy();
    }
  });

  it('throws an error if user tries to sign up with a blank password', async () => {
    const parent = {};
    const loginArgs = {
      email: 'another@user.com',
      password: ''
    };

    try {
      await Mutation.register(parent, loginArgs, context);
    } catch (e) {
      expect(e.message).toBe('Password cannot be blank!');
      expect(e instanceof UserInputError).toBeTruthy();
    }
  });

  it('throws an error if the password smaller than 8 characters', async () => {
    const parent = {};
    const loginArgs = {
      email: 'another@user.com',
      password: 'passwor'
    };

    try {
      await Mutation.register(parent, loginArgs, context);
    } catch (e) {
      expect(e.message).toBe('Password must be at least 8 characters long!');
      expect(e instanceof UserInputError).toBeTruthy();
    }
  });
});
