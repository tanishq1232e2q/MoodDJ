import { useState, useEffect } from 'react';
import { getTopTracks } from '../services/api';

export default function TopTracks() {
  const [top, setTop] = useState([]);

  const loadTop = async () => {
    try {
      const res = await getTopTracks();
      setTop(res.data);
    } catch (err) { }
  };

  useEffect(() => {
    loadTop();
    const interval = setInterval(loadTop, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: '#111827',
      padding: '24px',
      borderRadius: '12px',
      border: '2px solid #22c55e',
      color: 'white',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        Most Played
      </h2>
      {top.length === 0 ? (
        <p style={{ color: '#9ca3af' }}>Generate some mixes</p>
      ) : (
        <div style={{overflow:"scroll-y"}}>
          {top.map((t, i) => (
            <div key={t._id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#1f2937',
              padding: '12px',
              margin: '8px 0',
              borderRadius: '8px'
            }}>
              <div >
                <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#fbbf24', marginRight: '12px' }}>
                  #{i + 1}
                </span>
                <span style={{ fontWeight: '600' }}>{t.title}</span>
              </div>
              <span style={{ color: '#22c55e', fontWeight: 'bold' }}>
                {t.playCountInMixes} plays
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}