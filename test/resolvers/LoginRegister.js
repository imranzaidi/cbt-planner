/* global describe it expect beforeAll afterAll */

/***********************
 * Module Dependencies *
 ***********************/
const jsonwebtoken = require('jsonwebtoken'),
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
    setupDatabase();
    connect();

    context = {
      models: sequelizeService.models,
      SECRET
    };
  });

  afterAll(() => {
    closeConnection();
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
});
