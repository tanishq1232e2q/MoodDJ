const express = require('express');
const router = express.Router();
const { generateMix, getTopTracks } = require('../controllers/mixcontroller');

router.post('/generate', generateMix);
router.get('/stats/top-tracks', getTopTracks);

module.exports = router;