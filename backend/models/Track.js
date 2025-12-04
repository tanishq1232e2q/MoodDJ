const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, default: 'Unknown' },
  filename: { type: String, required: true },    
  url: { type: String, required: true },          
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  duration: { type: Number, default: 0 },
  uploadDate: { type: Date, default: Date.now },
  playCountInMixes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Track', trackSchema);