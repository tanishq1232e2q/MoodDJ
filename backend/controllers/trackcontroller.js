// backend/controllers/trackcontroller.js  ←  FINAL MEMORY VERSION
const cloudinary = require('cloudinary').v2;
const Track = require('../models/Track');
const os = require('os');
const path = require('path');
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadTrack = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Create temp file in OS temp directory (always writable on Render)
    const tempFilePath = path.join(os.tmpdir(), `upload-${Date.now()}-${req.file.originalname}`);
    fs.writeFileSync(tempFilePath, req.file.buffer);  // ← FROM MEMORY BUFFER

    const result = await cloudinary.uploader.upload(tempFilePath, {
      resource_type: 'video',
      folder: 'mooddj',
      use_filename: true,
      unique_filename: false,
    });

    // Clean up
    fs.unlinkSync(tempFilePath);

    const track = new Track({
      title: req.file.originalname.replace(/\.[^/.]+$/, ''),
      artist: 'Unknown',
      filename: result.public_id,
      url: result.secure_url,
      mimetype: req.file.mimetype,
      size: req.file.size,
      duration: Math.round(result.duration || 0),
    });

    await track.save();
    res.json(track);
  } catch (err) {
    console.error('Upload failed:', err.message);
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
};

const getAllTracks = async (req, res) => {
  try {
    const tracks = await Track.find().sort({ uploadDate: -1 });
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load tracks' });
  }
};

const streamTrack = (req, res) => {
  Track.findOne({ filename: req.params.filename })
    .then(track => {
      if (!track?.url) return res.status(404).json({ error: 'Not found' });
      res.redirect(track.url);
    })
    .catch(() => res.status(500).json({ error: 'Server error' }));
};

module.exports = { uploadTrack, getAllTracks, streamTrack };
