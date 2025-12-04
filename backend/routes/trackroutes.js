// backend/routes/trackroutes.js  ←  FINAL CLOUDINARY VERSION
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadTrack, getAllTracks, streamTrack } = require('../controllers/trackcontroller');

// Multer now ONLY saves to temp folder (Cloudinary will read from there)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'temp_uploads/');  // any folder, will be deleted anyway
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// ONLY THIS LINE USES MULTER — Cloudinary reads the file from disk
router.post('/upload', upload.single('music'), uploadTrack);

router.get('/', getAllTracks);
router.get('/file/:filename', streamTrack);

module.exports = router;