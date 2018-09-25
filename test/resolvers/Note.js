/***********************
 * Module Dependencies *
 ***********************/
const { Query, Mutation, Note } = require('../../app/resolvers/Note'),
  {
    sequelizeService,
    setupDatabase,
    connect,
    closeConnection
  } = require('../../tools/testDBSetup');

let context;
let user;
let task;
let note;

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

    const taskPayload = {
      description: 'Follow up with commissioner Gordon.',
      priority: 'a',
      status: 'incomplete',
      user_id: user.id
    };
    task = (await sequelizeService.models.Task.create(taskPayload)).dataValues;

    const notePayload = {
      content: 'Do it before Joker breaks out of Arkham.',
      task_id: task.id
    };
    note = (await sequelizeService.models.Note.create(notePayload)).dataValues;

    context = {
      models: sequelizeService.models,
      user
    };
  });

  afterAll(async () => {
    await closeConnection();
  });

  it('fetches an existing note', async () => {
    const parent = {};
    const args = { id: note.id };

    const result = await Query.getNote(parent, args, context);
    expect(result.id).toBe(note.id);
    expect(result.content).toBe(note.content);
  });

  it('creates a new note', async () => {
    const parent = {};
    const args = {
      taskId: task.id,
      content: 'Take out the Riddler.'
    };

    const result = await Mutation.createNote(parent, args, context);
    expect(result).toHaveProperty('id');
    expect(result.id).not.toBe(note.id);
    expect(result.content).toBe(args.content);
    expect(result.task_id).toBe(args.taskId);
  });

  it('updates an existing note', async () => {
    const parent = {};
    const args = {
      id: note.id,
      content: 'Stop Harvey Dent.'
    };

    const result = await Mutation.updateNote(parent, args, context);
    const updatedNote = (await sequelizeService.models.Note.findOne({
      where: { id: note.id }
    })).dataValues;

    expect(result[0]).toBe(1);
    expect(updatedNote.id).toBe(note.id);
    expect(updatedNote.content).toBe(args.content);
  });

  it('gets the associated task', async () => {
    const parent = { task_id: task.id };
    const args = {};

    const result = await Note.task(parent, args, context);
    expect(result.id).toBe(task.id);
  });

  it('deletes an existing note', async () => {
    const parent = {};
    const args = {
      id: note.id
    };

    const result = await Mutation.deleteNote(parent, args, context);
    const updatedNote = await sequelizeService.models.Note.findOne({
      where: { id: note.id }
    });

    expect(result).toBe(1);
    expect(updatedNote).toBe(null);
  });
});
