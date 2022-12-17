// import Express
const express = require('express');
const app = express();
const PORT = 3000;

// import API route information
const api = require('./routes/api-router');
  
// import filesystem and path
const fs = require('fs');
const path = require('path');

// import JSON note data
const noteData = require('./db/db.json');

// Middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// api thing, i dont really know
app.get('/api/notes', (req, res) => res.json(noteData));

// Server is listening
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT} 🚀`);
})