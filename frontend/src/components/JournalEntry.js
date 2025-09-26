import React from 'react';

export default function JournalEntry({ entry }) {
  return (
    <div style={{ border: '1px solid gray', margin: '5px', padding: '5px' }}>
      <p><strong>ID:</strong> {entry.id}</p>
      <p><strong>Text:</strong> {entry.text}</p>
      <p><strong>Sentiment:</strong> {entry.sentiment}</p>
    </div>
  );
}
