import { useState, useEffect } from 'react';
import UploadForm from './components/Uploadform';
import TrackList from './components/Tracklist';
import MoodForm from './components/Moodform';
import PlaylistPlayer from "./components/Playlistplanner";
import TopTracks from './components/Toptracks';

function App() {
  const [playlist, setPlaylist] = useState(null);

  return (
    <>
    <div   style={{height:"fit-content",width:"100vw",background:"linear-gradient(to right, #7e22ce, #000000)",padding:"20px",borderRadius:"10px",marginBottom:"20px"}}>

      <h1 style={{textAlign:"center",color:"ActiveBorder"}} className="text-5xl font-bold text-center mb-10">MoodMix DJ</h1>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}  className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white p-8">
      
      <div   className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"2rem"}}  className="space-y-8">
          <UploadForm />
          <MoodForm setPlaylist={setPlaylist} />
          <TopTracks />
        </div>
        
        <div style={{marginTop:"2rem"}} className="lg:col-span-2">
          <TrackList />
          {playlist && <PlaylistPlayer playlist={playlist} />}
        </div>
      </div>
    </div>
    </div>
    </>
  );
}

export default App;