const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// GET Route for retrieving all notes
router.get('/', (req, res) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
  });

// GET Route for a specific note
router.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/notes.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
  });


// POST request to add a note
router.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    const { title, text } = req.body;
  
    if (title && text) {
      const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
      };
      readAndAppend(newNote, './db/notes.json');
      const response = {
        status: 'success',
        body: newNote,
      };
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting note');
    }
  });


//  DELETE route for specific note
  router.delete(`/:id`, (req, res) => {
    const noteId = req.params.id;
  readFromFile('./db/notes.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((note) => note.id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/notes.json', result);

      // Respond to the DELETE request
      res.json(`Note ${id} has been deleted 🗑️`);
    });
});

  module.exports = router;
