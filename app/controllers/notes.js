/***********************
 * Module Dependencies *
 ***********************/
const mongoose = require('mongoose'),
  Note = mongoose.model('Note'),
  notesLib = require('../libraries/notes');


/**
 * Create a note.
 *
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 */
function create(req, res) {
  const payload = req.body,
    errorMessage = notesLib.validateNote(payload);

  if (errorMessage) {
    return res.status(400).send({ error: errorMessage });
  }

  const newNote = new Note(payload);
  return newNote.save((err) => {
    if (err) return res.status(500).send({ error: 'Error creating note.' });

    return res.status(201).json(newNote);
  });
}

/**
 * Read a note.
 *
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 */
function read(req, res) {
  const { note } = req;
  res.status(200).json(note);
}

/**
 * Update a note.
 *
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 */
function update(req, res) {
  const payload = req.body,
    errorMessage = notesLib.validateNote(payload);

  if (errorMessage) {
    return res.status(400).send({ error: errorMessage });
  }

  if (errorMessage) {
    return res.status(400).send({ error: errorMessage });
  }

  const { note } = req;

  note.content = payload.content;

  return note.save((err) => {
    if (err) return res.status(500).send({ error: err });

    return res.status(200).json(note);
  });
}

/**
 * Destroy a note.
 *
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 */
function destroy(req, res) {
  const { note } = req;

  return note.remove((err) => {
    if (err) return res.status(500).send({ message: 'Delete failed.' });

    return res.sendStatus(204);
  });
}

/**
 * Helper middle-ware function to look up notes by ID.
 *
 * @param {Object} req - express request object
 * @param {Object} res - express response object
 * @param {Function} next - next function handler in express
 * @param {String} id - note ID
 * @returns {*} void
 */
function findNoteByID(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Note ID is invalid.'
    });
  }

  return Note.findById(id).exec((err, note) => {
    if (err) return next(err);
    else if (!note) {
      return res.status(404).send({
        message: 'No note associated with this ID was found.'
      });
    }

    req.note = note;
    return next();
  });
}


module.exports = {
  create,
  read,
  update,
  destroy,
  findNoteByID
};
