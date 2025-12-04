import { useState } from 'react';
import { uploadTrack } from '../services/api';

export default function UploadForm({ onUpload }) {
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = e.target.music.files[0];
    if (!file) return;

    setUploading(true);
    try {
      await uploadTrack(file);
      e.target.reset();
      onUpload && onUpload();
    } catch (err) {
      alert('Upload failed');
    }
    setUploading(false);
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
        Upload Music
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="music"
          accept="audio/mp3,audio/wav"
          required
          style={{
            display: 'block',
            width: '80%',
            padding: '16px',
            background: '#a855f7',
            color: 'white',
            borderRadius: '50px',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        />
        <button
          type="submit"
          disabled={uploading}
          style={{
            marginTop: '16px',
            width: '100%',
            padding: '14px',
            background: '#a855f7',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: uploading ? 'not-allowed' : 'pointer',
            opacity: uploading ? 0.6 : 1
          }}
        >
          {uploading ? 'Uploading...' : 'Upload Track'}
        </button>
      </form>
    </div>
  );
}