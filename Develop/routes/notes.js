const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// import JSON note data
const noteData = require('../db/db.json');

// GET Route for retrieving new notes
notes.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

// POST request to add a note
notes.post('/notes', (req, res) => {
    // POST request was received
    console.info(`${req.method} request received to add a note`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text
      };
  
      readAndAppend(newNote, './db/db.json');
  
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

  module.exports = notes;
