const fs = require('fs')
const path = require('path');
const noteData = require('./db/db.json');

const express = require('express');
const router = express.Router();
const app = express();
const PORT = 3000;
  
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

var publicPath = path.join(__dirname, 'public');

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/"));
});

app.get('/notes', (req, res) => {
    res.sendFile(publicPath + '/notes.html');
});

app.get('/api/notes', (req, res) => {
    return res.json(noteData)
});
  
// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);





 // POST request to add a note
app.post('/api/notes', (req, res) => {
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


// Server is listening
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT} 🚀`);
})