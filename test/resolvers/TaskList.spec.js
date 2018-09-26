/***********************
 * Module Dependencies *
 ***********************/
const { Query, Mutation, TaskList } = require('../../app/resolvers/TaskList'),
  {
    sequelizeService,
    setupDatabase,
    connect,
    closeConnection
  } = require('../../tools/testDBSetup');

let context;
let user;
let task;
let taskListSpec;


describe('TaskList resolvers', () => {
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

    const taskPayload = {
      description: 'Follow up with commissioner Gordon.',
      priority: 'a',
      status: 'incomplete',
      user_id: user.id
    };
    task = (await sequelizeService.models.Task.create(taskPayload)).dataValues;

    const taskListPayload = {
      startDate: (new Date()).toString(),
      type: 'monthly',
      user_id: user.id
    };
    taskListSpec = (await sequelizeService.models.TaskList.create(taskListPayload)).dataValues;

    context = {
      models: sequelizeService.models,
      user
    };
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('fetches an existing task list by ID', async () => {
    const parent = {};
    const args = { id: taskListSpec.id };

    const result = await Query.getTaskListById(parent, args, context);
    expect(result).toHaveProperty('id', taskListSpec.id);
    expect(result.type).toBe(taskListSpec.type);
  });

  it('creates a new task list when no startDate is defined', async () => {
    const parent = {};
    const args = {
      startDate: undefined,
      type: 'weekly'
    };

    const result = await Mutation.createTaskList(parent, args, context);
    expect(result).toHaveProperty('id');
    expect(result.type).toBe(args.type);
  });

  it('creates a new task list when a startDate is defined', async () => {
    const parent = {};
    const args = {
      startDate: (new Date()).toString(),
      type: 'weekly'
    };

    const result = await Mutation.createTaskList(parent, args, context);
    expect(result).toHaveProperty('id');
    expect(result.type).toBe(args.type);
  });

  it('fetches existing task lists for the current user', async () => {
    const parent = {};
    const args = {};

    const result = await Query.getTaskLists(parent, args, context);
    expect(result instanceof Array).toBe(true);
    expect(result.length).toBe(3);
  });

  it('doesn\'t add a task to a task list for an invalid task id', async () => {
    const parent = {};
    const args = {
      taskId: 100,
      taskListId: taskListSpec.id
    };

    await Mutation.addTaskToTaskList(parent, args, context);
    const updatedList = await TaskList.tasks({ id: taskListSpec.id }, {}, context);
    expect(updatedList instanceof Array).toBe(true);
    expect(updatedList.length).toBe(0);
  });

  it('doesn\'t add a task to a task list for an invalid task list id', async () => {
    const parent = {};
    const args = {
      taskId: task.id,
      taskListId: 100
    };

    await Mutation.addTaskToTaskList(parent, args, context);
    const updatedList = await TaskList.tasks({ id: taskListSpec.id }, {}, context);
    expect(updatedList instanceof Array).toBe(true);
    expect(updatedList.length).toBe(0);
  });

  it('adds a task to a task list', async () => {
    const parent = {};
    const args = {
      taskId: task.id,
      taskListId: taskListSpec.id
    };

    await Mutation.addTaskToTaskList(parent, args, context);
    const updatedList = await TaskList.tasks({ id: taskListSpec.id }, {}, context);
    expect(updatedList instanceof Array).toBe(true);
    expect(updatedList.length).toBe(1);
    expect(updatedList[0].id).toBe(1);
  });

  it('doesn\'t adds tasks to a task list for invalid task ids', async () => {
    const parent = {};
    const args = {
      taskIds: [100, 200],
      taskListId: taskListSpec.id
    };

    await Mutation.addTasksToTaskList(parent, args, context);
    const updatedList = await TaskList.tasks({ id: taskListSpec.id }, {}, context);
    expect(updatedList instanceof Array).toBe(true);
    expect(updatedList.length).toBe(1);
  });

  it('adds tasks to a task list', async () => {
    const newTask1 = (await sequelizeService.models.Task.create({
      description: 'Chase Catwoman.',
      user_id: user.id
    })).dataValues;
    const newTask2 = (await sequelizeService.models.Task.create({
      description: 'Beat the crap of of Bane.',
      user_id: user.id
    })).dataValues;

    const parent = {};
    const args = {
      taskIds: [newTask1.id, newTask2.id],
      taskListId: taskListSpec.id
    };

    await Mutation.addTasksToTaskList(parent, args, context);
    const updatedList = await TaskList.tasks({ id: taskListSpec.id }, {}, context);
    expect(updatedList instanceof Array).toBe(true);
    expect(updatedList.length).toBe(3);
    expect(updatedList[2].id).toBe(newTask2.id);
  });

  it('doesn\'t adds tasks to a task list for invalid task ids', async () => {
    const newTask1 = (await sequelizeService.models.Task.create({
      description: 'Find Scarecrow.',
      user_id: user.id
    })).dataValues;
    const parent = {};
    const args = {
      taskIds: [newTask1.id],
      taskListId: 100
    };

    await Mutation.addTasksToTaskList(parent, args, context);
    const updatedList = await TaskList.tasks({ id: taskListSpec.id }, {}, context);
    expect(updatedList instanceof Array).toBe(true);
    expect(updatedList.length).toBe(3);
  });

  it('return the user for a task list', async () => {
    const parent = { id: taskListSpec.id };
    const args = {};

    const returnedUser = await TaskList.user(parent, args, context);
    expect(returnedUser.id).toBe(user.id);
  });

  it('deletes a task list', async () => {
    const parent = {};
    const args = { id: taskListSpec.id };

    await Mutation.deleteTaskList(parent, args, context);
    const updatedList = await sequelizeService.models.TaskList.findOne({
      where: { id: taskListSpec.id }
    });
    expect(updatedList).toBe(null);
  });
});
