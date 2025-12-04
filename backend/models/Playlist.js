const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    moodPrompt: 
    { type: String, required: true },
    generatedAt: 
    { type: Date, default: Date.now },
    tracks: [{
        track: { type: mongoose.Schema.Types.ObjectId, ref: 'Track' },
        order: Number,
        weight: Number
    }]
});

module.exports = mongoose.model('Playlist', playlistSchema);