/***********************
 * Module Dependencies *
 ***********************/
const { Query, Mutation } = require('../../app/resolvers/User'),
  {
    sequelizeService,
    setupDatabase,
    connect,
    closeConnection
  } = require('../../tools/testDBSetup');

let context;
let user;


describe('User resolvers', () => {
  beforeAll(async () => {
    await setupDatabase();
    await connect();

    const payload = {
      username: 'bruce.wayne',
      email: 'bruce.wayne@batman.com',
      password: 'password'
    };

    user = (await sequelizeService.models.User.create(payload)).dataValues;

    context = {
      models: sequelizeService.models,
      user
    };
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('returns the current user', async () => {
    const parent = {};
    const args = {};

    const result = await Query.getUser(parent, args, context);
    expect(result).toHaveProperty('id', user.id);
    expect(result).toHaveProperty('username', user.username);
    expect(result).toHaveProperty('email', user.email);
    expect(result).toHaveProperty('createdAt', user.createdAt);
    expect(result).toHaveProperty('updatedAt', user.updatedAt);
    expect(result).toHaveProperty('password', null);
  });

  it('does not update the current user if no information is passed', async () => {
    const parent = {};
    const args = {
      newUsername: undefined,
      newEmail: undefined,
      newPassword: undefined
    };

    const result = await Mutation.updateUser(parent, args, context);
    expect(result).toHaveProperty('id', user.id);
    expect(result).toHaveProperty('username', user.username);
    expect(result).toHaveProperty('email', user.email);
    expect(result).toHaveProperty('createdAt', user.createdAt);
    expect(result).toHaveProperty('updatedAt', user.updatedAt);
    expect(result).toHaveProperty('password', null);
  });

  it('updates the current user when new information is passed', async () => {
    const parent = {};
    const args = {
      newUsername: 'the.dark.knight',
      newEmail: 'the.dark.knight@batman.com',
      newPassword: 'alfred'
    };

    const result = await Mutation.updateUser(parent, args, context);
    expect(result).toHaveProperty('id', user.id);
    expect(result).toHaveProperty('username', args.newUsername);
    expect(result).toHaveProperty('email', args.newEmail);
    expect(result).toHaveProperty('createdAt', user.createdAt);
    expect(result).toHaveProperty('updatedAt');
    expect(result.updatedAt.valueOf()).toBeGreaterThan(user.updatedAt.valueOf());
    expect(result).toHaveProperty('password', null);
  });
});
