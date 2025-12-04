import { useState, useEffect } from 'react';
import { getTracks } from '../services/api';

export default function TrackList() {
  const [tracks, setTracks] = useState([]);

  const loadTracks = async () => {
    const res = await getTracks();
    setTracks(res.data);
  };

  useEffect(() => { loadTracks(); }, []);

  return (
    <div style={{
      background: '#111827',
      padding: '24px',
      borderRadius: '12px',
      border: '2px solid #6b7280',
      color: 'white',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        Your Library ({tracks.length})
      </h2>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {tracks.length === 0 ? (
          <p style={{ color: '#9ca3af' }}>No tracks yet. Upload some!</p>
        ) : (
          tracks.map(track => (
            <div key={track._id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#1f2937',
              padding: '12px',
              margin: '8px 0',
              borderRadius: '8px'
            }}>
              <div>
                <p style={{ fontWeight: '600', margin: 0 }}>{track.title}</p>
                <p style={{ color: '#9ca3af', fontSize: '14px', margin: '4px 0 0' }}>
                  {track.artist}
                </p>
              </div>
              <audio controls style={{ height: '40px' }}>
                <source src={track?.url} type={track.mimetype} />
              </audio>
            </div>
          ))
        )}
      </div>
      <button
        onClick={loadTracks}
        style={{
          marginTop: '16px',
          background: 'transparent',
          border: 'none',
          color: '#a855f7',
          fontSize: '14px',
          cursor: 'pointer'
        }}
      >
        Refresh Library
      </button>
    </div>
  );
}