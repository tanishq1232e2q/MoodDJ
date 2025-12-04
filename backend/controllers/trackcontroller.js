const cloudinary = require('cloudinary').v2;
const Track = require('../models/Track');

// Configure Cloudinary
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

    
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'video',           
      folder: 'mooddj',
      use_filename: true,
      unique_filename: false,
    });

    const track = new Track({
      title: req.file.originalname.replace(/\.[^/.]+$/, ''),
      artist: 'Unknown',
      filename: result.public_id,     
      url: result.secure_url,           
      mimetype: req.file.mimetype,
      size: req.file.size,
      duration: result.duration || 0,
    });

    await track.save();
    res.json(track);
  } catch (err) {
    console.error('Cloudinary upload failed:', err.message);
    res.status(500).json({ error: 'Upload failed' });
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
  const publicId = req.params.filename;

  Track.findOne({ filename: publicId })
    .then(track => {
      if (!track || !track.url) {
        return res.status(404).json({ error: 'Track not found' });
      }
      res.redirect(track.url);
    })
    .catch(() => res.status(500).json({ error: 'Server error' }));
};

module.exports = { uploadTrack, getAllTracks, streamTrack };