// import filesystem, path, noteData from JSON, and API
const fs = require('fs')
const path = require('path');
const noteData = require('./db/db.json');
const api = require('./public/assets/js/index');

// import Express
const express = require('express');
const router = express.Router();
const app = express();
const PORT = 3000;
  
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
var publicPath = path.join(__dirname, 'public');

app.use('/api', api);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/"));
});

app.get('/notes', (req, res) => {
    res.sendFile(publicPath + '/notes.html');
});  

// Server is listening
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT} 🚀`);
})