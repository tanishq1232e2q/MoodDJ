import { useState, useRef, useEffect } from 'react';

export default function PlaylistPlayer({ playlist }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);
  const currentTrack = playlist.tracks[currentIndex]?.track;

  useEffect(() => {
    if (audioRef.current) audioRef.current.load();
  }, [currentIndex]);

  const nextTrack = () => {
    setCurrentIndex((i) => (i + 1) % playlist.tracks.length);
  };

  return (
    <div style={{
      marginTop: '32px',
      background: 'linear-gradient(to bottom right, #581c87, #000000)',
      padding: '32px',
      borderRadius: '16px',
      border: '3px solid #a855f7',
      boxShadow: '0 20px 40px rgba(168, 85, 247, 0.4)',
      color: 'white',
      textAlign: 'center',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>
        Mix for: <span style={{ color: '#c084fc' }}>"{playlist.moodPrompt}"</span>
      </h2>

      {currentTrack && (
        <>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', margin: '16px 0' }}>
            {currentTrack.title}
          </h3>
          <p style={{ color: '#d1d5db', marginBottom: '24px' }}>
            {currentTrack.artist}
          </p>

          <audio
            ref={audioRef}
            controls
            autoPlay
            onEnded={nextTrack}
            style={{ width: '100%', height: '60px', marginTop: '24px' }}
          >
            <source src={currentTrack?.url} type={currentTrack.mimetype} />
          </audio>

          <div style={{ marginTop: '32px' }}>
            <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '12px' }}>
              Playlist ({playlist.tracks.length} tracks)
            </p>
            <div style={{ textAlign: 'left' }}>
              {playlist.tracks.map((item, i) => (
                <div
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  style={{
                    padding: '12px',
                    margin: '8px 0',
                    background: i === currentIndex ? '#7c3aed' : '#1f2937',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <strong>{i + 1}.</strong> {item.track.title}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}