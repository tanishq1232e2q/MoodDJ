const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadTrack, getAllTracks, streamTrack } = require('../controllers/trackcontroller');

const upload = multer({
  storage: multer.memoryStorage(), 
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
  fileFilter: (req, file, cb) => {
    const allowed = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/x-wav'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only MP3/WAV files allowed'));
    }
  }
});

router.post('/upload', upload.single('music'), uploadTrack);
router.get('/', getAllTracks);
router.get('/file/:filename', streamTrack);

module.exports = router;
