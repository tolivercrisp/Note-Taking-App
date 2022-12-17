// import Express
const express = require('express');
const app = express();
const PORT = 3000;
  
// import filesystem and path
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

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
  let id = uuidv4();
      let newNote = {
        title,
        text,
        id: id,
      };
      notes.push(newNote);
      const stringifyNote = JSON.stringify(notes);
      res.json(notes);
      fs.writeFile("db/notes.json", stringifyNote, (err) => {
        if (err) console.log(err);
        else {
          console.log("Note successfully saved to db.json");
        }
      });
    });

//  DELETE route for specific note
  app.delete('/api/notes/:id', (req, res) => {
    let noteID = req.params.id;
    fs.readFile("db/db.json", "utf8", function (err, data) {
      let updatedNotes = JSON.parse(data).filter((note) => {
        return note.id !== noteID;
      });
      notes = updatedNotes;
      const stringifyNote = JSON.stringify(updatedNotes);
      fs.writeFile("db/notes.json", stringifyNote, (err) => {
        if (err) console.log(err);
        else {
          console.log("Note successfully deleted from db.json");
        }
      });
      res.json(stringifyNote);
    });
  });

// Server is listening
app.listen(PORT, () => {
        console.log(`Server listening at http://localhost:${PORT} 🚀 ...`);
})