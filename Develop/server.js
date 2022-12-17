// import Express
const express = require('express');
const app = express();
const PORT = 3000;

// import API route information
const api = require('./routes/api-router');
  
// import filesystem and path
const fs = require('fs');
const path = require('path');

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


// Server is listening
app.listen(PORT, () => {
        console.log(`Server listening at http://localhost:${PORT} 🚀 ...`);
})