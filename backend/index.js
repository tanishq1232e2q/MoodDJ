require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

// 1. CORS — MUST BE FIRST + ALLOW VERCEL
app.use(cors({
  origin: [
    'https://mood-dj-psi.vercel.app',  
             
  ],
  credentials: true
}));

// 2. Body parsers — REQUIRED for file upload
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

//Health check — keeps Render awake
app.get('/api/health', (req, res) => {
  res.json({ status: 'alive', time: new Date().toISOString() });
});


const trackRoutes = require('./routes/trackroutes');
const mixRoutes = require('./routes/mixroutes');

app.use('/api/tracks', trackRoutes);
app.use('/api/mix', mixRoutes);


// 6. 404 handler — SAFE WAY (NO '*')
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});


mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection FAILED:', err.message);
    process.exit(1); // Stop server if DB fails
  });

const PORT = process.env.PORT || 10000;  

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend LIVE → https://mooddj-backend.onrender.com`);
  console.log(`Local: http://localhost:${PORT}`);
});
