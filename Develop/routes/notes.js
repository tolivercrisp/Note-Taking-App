const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// POST request to add a note
notes.post('/api/notes', (req, res) => {
    // Log that a POST request was received
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
  
      // Convert the data to a string so we can save it
      const noteString = JSON.stringify(newNote);
  
      // Write the string to a file
      fs.writeFile(`./db/db.json`, noteString, (err) =>
        err
          ? console.error(err)
          : console.log(
              `Note for ${newNote.product} has been written to JSON file`
            )
      );
  
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
