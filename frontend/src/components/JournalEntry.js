import React from 'react';

export default function JournalEntry({ entry }) {
  return (
    <div style={{ border: '1px solid gray', margin: '5px 0', padding: '10px', borderRadius: '5px' }}>
      <p><strong>ID:</strong> {entry.id}</p>
      <p><strong>Text:</strong> {entry.text}</p>
      <p><strong>Sentiment:</strong> {entry.sentiment || 'N/A'}</p>
      <p><small>{new Date(entry.created_at).toLocaleString()}</small></p>
    </div>
  );
}
