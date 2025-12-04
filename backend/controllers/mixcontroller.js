// backend/controllers/mixController.js
const Track = require('../models/Track');
const Playlist = require('../models/Playlist');
const redis = require('../redis-client');
const { Groq } = require('groq-sdk');
const mongoose = require('mongoose');

const groq = new Groq({ 
  apiKey: process.env.GROQ_API_KEY,
  timeout: 30000
});

const generateMix = async (req, res) => {
  const { mood } = req.body;
  if (!mood?.trim()) return res.status(400).json({ error: 'Mood required' });

  let tracks;
  try {
    tracks = await Track.find({});
  } catch (e) {
    return res.status(500).json({ error: 'Database error' });
  }

  if (tracks.length === 0) {
    return res.status(400).json({ error: 'Upload some music first!' });
  }

  const trackList = tracks
    .map((t, i) => `${i + 1}. "${t.title}" by ${t.artist || 'Unknown'}`)
    .join('\n');

  const prompt = `Mood: "${mood}"
Available tracks:
${trackList}

Respond with ONLY a JSON array of track numbers (1-based) that best match the mood.
Example: [3,7,1,9]
3–6 tracks. No text. No markdown.`;

  let selectedIndexes = [];

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 120,
    });

    const text = (completion.choices?.[0]?.message?.content || '[]')
      .replace(/```json|```/g, '')
      .trim();

    const numbers = text.match(/\d+/g);
    if (numbers) {
      selectedIndexes = [...new Set(
        numbers
          .map(n => parseInt(n))
          .filter(n => n > 0 && n <= tracks.length)
      )].slice(0, 6);
    }
  } catch (err) {
    console.log('Groq failed → using smart random:', err.message);
  }

  // SMART FALLBACK — NEVER SAME PLAYLIST TWICE
  if (selectedIndexes.length < 3) {
    console.log('Using smart random for mood:', mood);
    const shuffled = [...tracks];
    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const count = Math.min(6, Math.max(4, tracks.length));
    selectedIndexes = shuffled
      .slice(0, count)
      .map(t => tracks.indexOf(t) + 1);
  }

  // Build playlist
  const playlistTracks = selectedIndexes.map((idx, i) => ({
    track: tracks[idx - 1]._id,
    order: i + 1,
    weight: 1 - i * 0.1
  }));

  try {
    const playlist = new Playlist({
      moodPrompt: mood,
      tracks: playlistTracks,
      generatedAt: new Date()
    });
    await playlist.save();

    // Update play counts
    for (const pt of playlistTracks) {
      await Track.updateOne(
        { _id: pt.track },
        { $inc: { playCountInMixes: 1 } }
      );
    }

    // Clear cache
    try { await redis.del('top-tracks'); } catch (e) {}

    const populated = await Playlist.findById(playlist._id)
      .populate('tracks.track');

    res.json(populated);
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ error: 'Failed to save playlist' });
  }
};

const getTopTracks = async (req, res) => {
  try {
    const cached = await redis.get('top-tracks');
    if (cached) return res.json(JSON.parse(cached));
  } catch (e) {}

  const top = await Track.aggregate([
    { $match: { playCountInMixes: { $gt: 0 } } },
    { $sort: { playCountInMixes: -1, uploadDate: -1 } },
    { $limit: 10 },
    { $project: { title: 1, artist: 1, playCountInMixes: 1 } }
  ]);

  try {
    await redis.set('top-tracks', JSON.stringify(top || []), 'EX', 300);
  } catch (e) {}

  res.json(top || []);
};

module.exports = { generateMix, getTopTracks };