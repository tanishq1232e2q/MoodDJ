// frontend/src/services/api.js  ←  FINAL WORKING VERSION
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', 
  timeout: 30000,  // ← THIS IS THE FIX
  headers: {
    'Content-Type': 'application/json',
  }
});

export const uploadTrack = (file) => {
  const formData = new FormData();
  formData.append('music', file);
  return api.post('/tracks/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const getTracks = () => api.get('/tracks');
export const generateMix = (mood) => api.post('/mix/generate', { mood });
export const getTopTracks = () => api.get('/mix/stats/top-tracks');

export default api;