<div align="center">

# MoodDJ  
**Your Personal AI-Powered Mood Playlist Generator**

https://mood-dj-psi.vercel.app/

**Type “gym energy”, “sad rainy night”, “focus coding”, or any vibe — get the perfect playlist from YOUR music in seconds.**

<div align="center">
  <img src="myapp/src/assets/Screenshot 2025-12-04 130759.png" alt="MoodDJ Preview" width="100%"/>
</div>


[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://mood-dj-three.vercel.app)
[![Render](https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=render&logoColor=white)](https://mooddj-backend.onrender.com)
[![Groq](https://img.shields.io/badge/Groq-Llama3.1%2070B-FF6B6B?style=for-the-badge&logo=groq)](https://groq.com)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com)

</div>

## Features

- **Upload your own songs** (MP3/WAV up to 100MB)  
- **Type any mood** → instantly get a 3–6 track curated mix  
- **Powered by Groq Llama 3.1 70B** – understands song titles & vibes perfectly  
- **Smart Top Tracks** – learns your taste over time (cached with Upstash Redis)  
- **Cloudinary storage** – songs never disappear (even after restart)  
- **Zero Spotify login** – 100% private, your music only  
- **Beautiful dark UI** with playback, drag & drop, playlist view  
- **Fully responsive** – works on mobile & desktop

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React + Vite                        |
| Backend     | Node.js + Express                   |
| AI          | Groq (Llama 3.1 70B)                 |
| Database    | MongoDB Atlas                       |
| Storage     | Cloudinary                          |
| Caching     | Upstash Redis                       |
| Hosting     | Vercel + Render                     |

## Live Demo

**Try it now:** https://mood-dj-three.vercel.app

Just upload a few songs and type:
- `gym energy`
- `sad hours`
- `lofi chill`
- `romantic dinner`
- `focus mode`

You’ll be amazed how smart it is.


## Setup (Local)

```bash
git clone https://github.com/yourusername/MoodDJ.git
cd MoodDJ

# Backend
cd backend && npm install
cp .env.example .env   # ← fill your keys
npm run dev

# Frontend (new terminal)
cd ../frontend && npm install && npm run dev
