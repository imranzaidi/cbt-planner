/***********************
 * Module Dependencies *
 ***********************/
const { Task: TaskSpec, Query, Mutation } = require('../../app/resolvers/Task'),
  {
    sequelizeService,
    setupDatabase,
    connect,
    closeConnection
  } = require('../../tools/testDBSetup');

let context;
let user;
let task;
let taskWithoutDueDate;
const today = new Date();


describe('Task resolvers', () => {
  beforeAll(async () => {
    await setupDatabase();
    await connect();

    const userPayload = {
      username: 'bruce.wayne',
      email: 'bruce.wayne@batman.com',
      password: 'password'
    };

    user = (await sequelizeService.models.User.create(userPayload)).dataValues;
    user.password = null;

    const aWeekFromNow = new Date(today.valueOf() + (7 * 24 * 60 * 60 * 1000));
    const taskPayload = {
      description: 'Follow up with commissioner Gordon.',
      priority: 'a',
      status: 'incomplete',
      user_id: user.id,
      due: aWeekFromNow
    };

    task = (await sequelizeService.models.Task.create(taskPayload)).dataValues;

    context = {
      models: sequelizeService.models,
      user
    };
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('returns a task', async () => {
    const parent = {};
    const args = { id: task.id };

    const result = await Query.getTask(parent, args, context);
    expect(result).toHaveProperty('id', task.id);
    expect(result).toHaveProperty('description', task.description);
    expect(result).toHaveProperty('priority', task.priority);
    expect(result).toHaveProperty('status', task.status);
    expect(result).toHaveProperty('createdAt', task.createdAt);
    expect(result).toHaveProperty('updatedAt', task.updatedAt);
    expect(result).toHaveProperty('user_id', user.id);
  });

  it('returns all task due by a date', async () => {
    const parent = {};
    const twoWeeksFromNow = new Date(today.valueOf() + (2 * 7 * 24 * 60 * 60 * 1000));
    const args = { date: twoWeeksFromNow };

    const result = await Query.getTasksDueBy(parent, args, context);
    expect(result.length).toBe(1);
    expect(result[0]).toHaveProperty('id', task.id);
    expect(result[0]).toHaveProperty('description', task.description);
    expect(result[0]).toHaveProperty('priority', task.priority);
    expect(result[0]).toHaveProperty('status', task.status);
    expect(result[0]).toHaveProperty('createdAt', task.createdAt);
    expect(result[0]).toHaveProperty('updatedAt', task.updatedAt);
    expect(result[0]).toHaveProperty('user_id', user.id);

    args.date = new Date(today.valueOf() + ((7 * 24 * 60 * 60 * 1000) - 1));
    const emptyResult = await Query.getTasksDueBy(parent, args, context);
    expect(emptyResult.length).toBe(0);
  });

  it('returns all incomplete tasks', async () => {
    const parent = {};
    const args = {};

    const result = await Query.getIncompleteTasks(parent, args, context);
    expect(result.length).toBe(1);
    expect(result[0]).toHaveProperty('id', task.id);
    expect(result[0]).toHaveProperty('description', task.description);
    expect(result[0]).toHaveProperty('priority', task.priority);
    expect(result[0]).toHaveProperty('status', task.status);
    expect(result[0]).toHaveProperty('createdAt', task.createdAt);
    expect(result[0]).toHaveProperty('updatedAt', task.updatedAt);
    expect(result[0]).toHaveProperty('user_id', user.id);
  });

  it('creates new tasks', async () => {
    const parent = {};
    const args = {
      description: 'Call Alfred.',
      priority: 'b',
      status: 'incomplete',
      user_id: user.id
    };

    const result = await Mutation.createTask(parent, args, context);
    taskWithoutDueDate = result;
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('description', args.description);
    expect(result).toHaveProperty('priority', args.priority);
    expect(result).toHaveProperty('status', args.status);
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
    expect(result).toHaveProperty('user_id', user.id);
  });

  it('returns all incomplete tasks', async () => {
    const parent = {};
    const args = {};

    const result = await Query.getTasksWithoutDueDates(parent, args, context);
    expect(result.length).toBe(1);
    expect(result[0]).toHaveProperty('id', taskWithoutDueDate.id);
    expect(result[0]).toHaveProperty('description', taskWithoutDueDate.description);
    expect(result[0]).toHaveProperty('priority', taskWithoutDueDate.priority);
    expect(result[0]).toHaveProperty('status', taskWithoutDueDate.status);
    expect(result[0]).toHaveProperty('due', taskWithoutDueDate.due);
    expect(taskWithoutDueDate.due).toBe(null);
    expect(result[0]).toHaveProperty('createdAt', taskWithoutDueDate.createdAt);
    expect(result[0]).toHaveProperty('updatedAt', taskWithoutDueDate.updatedAt);
    expect(result[0]).toHaveProperty('user_id', user.id);
  });

  it('returns forwarded tasks', async () => {
    const parent = {};
    const args = {
      id: taskWithoutDueDate.id,
      status: 'forwarded'
    };

    await Mutation.updateTask(parent, args, context);
    const results = await Query.getForwardedTasks(parent, {}, context);
    expect(results.length).toBe(1);
    expect(results[0]).toHaveProperty('id', taskWithoutDueDate.id);
    expect(results[0]).toHaveProperty('description', taskWithoutDueDate.description);
    expect(taskWithoutDueDate.status).not.toBe(args.status);
    expect(results[0]).toHaveProperty('status', args.status);
    expect(results[0]).toHaveProperty('user_id', user.id);
  });

  it('updates an existing task', async () => {
    const parent = {};
    const args = {
      id: task.id,
      description: 'Warn commissioner Gordon.'
    };

    const result = await Mutation.updateTask(parent, args, context);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('description', args.description);
    expect(result).toHaveProperty('priority', task.priority);
    expect(result).toHaveProperty('status', task.status);
    expect(result).toHaveProperty('createdAt', task.createdAt);
    expect(result).toHaveProperty('updatedAt');
    expect(result.updatedAt.valueOf()).toBeGreaterThan(result.createdAt.valueOf());
    expect(result).toHaveProperty('user_id', user.id);
  });

  it('does not update an existing task if no update params are passed', async () => {
    const parent = {};
    const args = {
      id: task.id
    };

    const result = await Mutation.updateTask(parent, args, context);
    expect(result).toBe(null);
  });

  it('returns notes for a task', async () => {
    const parent = { id: task.id };
    const args = {};
    const notePayload = {
      content: 'Do it before Joker breaks out of Arkham.',
      task_id: task.id
    };

    const note = (await sequelizeService.models.Note.create(notePayload)).dataValues;
    const result = await TaskSpec.notes(parent, args, context);

    expect(note.id).toBe(result[0].id);
  });

  it('returns the user for the task', async () => {
    const parent = { id: task.id };
    const args = {};

    const result = await TaskSpec.user(parent, args, context);

    expect(result.id).toBe(result.id);
    expect(result).toHaveProperty('id', user.id);
    expect(result).toHaveProperty('username', user.username);
    expect(result).toHaveProperty('email', user.email);
    expect(result).toHaveProperty('password', null);
  });

  it('deletes an existing task', async () => {
    const parent = {};
    const args = {
      id: task.id
    };

    const result = await Mutation.deleteTask(parent, args, context);
    expect(result).toBe(1);
    const missingTask = await sequelizeService.models.Task.findOne({
      where: { id: task.id }
    });
    expect(missingTask).toBe(null);
  });
});
