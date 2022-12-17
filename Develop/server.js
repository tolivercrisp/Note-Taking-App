// import Express
const express = require('express');
const app = express();
const PORT = 3000;
  
// import filesystem and path
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('./helpers/fsUtils');

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
let notes = require('./db/notes.json')

// GET route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET route for notes API
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/notes.json', "utf8", function (err, data) {
    if (err) {
      console.log(err);
      return;
    }
    res.json(notes);
  });
});

// POST request to create a new note
app.post('/api/notes', (req, res) => {
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
  app.delete('/api/notes/:id', (req, res) => {
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

// Server is listening
app.listen(PORT, () => {
        console.log(`Server listening at http://localhost:${PORT} 🚀 ...`);
})