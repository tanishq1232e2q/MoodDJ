import { useState } from 'react';
import { generateMix } from '../services/api';

export default function MoodForm({ setPlaylist }) {
  const [mood, setMood] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood.trim()) return;
    setLoading(true);
    try {
      const res = await generateMix(mood);
      setPlaylist(res.data);
    } catch (err) {
      alert('Failed to generate mix. Check console.');
    }
    setLoading(false);
  };

  return (
    <div style={{
      background: '#111827',
      padding: '24px',
      borderRadius: '12px',
      border: '2px solid #a855f7',
      color: 'white',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
        What's the Mood?
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          placeholder="e.g. late night drive, cozy rain, gym energy..."
          style={{
            width: '90%',
            padding: '12px 16px',
            background: '#1f2937',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontSize: '16px',
            outline: 'none',
            boxShadow: mood ? '0 0 0 2px #a855f7' : 'none'
          }}
        />
        <button
          type="submit"
          disabled={loading || !mood}
          style={{
            marginTop: '16px',
            width: '100%',
            padding: '16px',
            background: 'linear-gradient(to right, #a855f7, #ec4899)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: loading || !mood ? 'not-allowed' : 'pointer',
            opacity: loading || !mood ? 0.5 : 1
          }}
        >
          {loading ? 'AI Thinking...' : 'Generate Mix'}
        </button>
      </form>
    </div>
  );
}