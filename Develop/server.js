// import filesystem, path, noteData from JSON, and API
const fs = require('fs')
const path = require('path');
const noteData = require('./db/db.json');
const api = require('./routes/notes');

// import Express
const express = require('express');
const router = express.Router();
const app = express();
const PORT = 3000;
  
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);


// Server is listening
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT} 🚀`);
})