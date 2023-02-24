const fs = require('fs');
const express = require('express');
const multer = require('multer');
const path = require('path');
const helpers = require('./helpers');

const app = express();

if(!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// list media files
app.get('/media', (req, res) => {
  const uploadsFolder = './uploads/';
  const files = fs.readdirSync(uploadsFolder).map(file => `/uploads/${file}`);
  res.json(files);
});
 
// handle favicon request
app.get('/favicon.ico', (req, res) => {
  console.log('favicon requested');
  res.download('./favicon.ico');
});

// serve index.html
app.get('/', (req, res) => {
  const htmlfile = fs.readFileSync('./index.html', 'utf8');
  res.send(htmlfile);
});

// configure multer to store uploaded files in uploads folder
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// handle file upload
app.post('/upload', (req, res) => {
  const upload = multer({ 
    storage: storage, 
    fileFilter: helpers.imageFilter 
  }).single('user_upload');

  upload(req, res, function(err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    }
    else if (!req.file) {
      return res.send('Please select a file to upload. <button onclick="window.history.back()">Go Back</button>');
    }
    else if (err instanceof multer.MulterError) {
      return res.send(err);
    }
    else if (err) {
      return res.send(err);
    }

    // refresh the page
    res.send(`<script>window.location.href = '/';</script>`);
  });
});

// serve files from uploads folder
app.get('/uploads/:file', (req, res) => {
  const file = req.params.file;
  const fileLocation = path.join('./uploads', file);
  res.download(fileLocation, file);
});

// serve files from subfolders of uploads folder
app.get('/uploads/:folder/:file', (req, res) => {
  const file = req.params.file;
  const folder = req.params.folder;
  const fileLocation = path.join('./uploads', folder, file);
  res.download(fileLocation, file);
});

// start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
