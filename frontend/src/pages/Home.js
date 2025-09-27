import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JournalEntry from '../components/JournalEntry';

export default function Home() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');

  const fetchEntries = async () => {
    try {
      const res = await axios.get('http://localhost:5001/entries');
      setEntries(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    fetchEntries();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newEntry) return;

    try {
      const res = await axios.post('http://localhost:5001/entries', {
        text: newEntry,
        sentiment: null // placeholder, AI will fill later
      });
      setEntries([res.data, ...entries]); // add new entry to top
      setNewEntry(''); // clear input
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h1>Journal AI</h1>

      {/* Entry form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Write a new journal entry..."
          rows="4"
          style={{ width: '100%', padding: '10px' }}
        />
        <button type="submit" style={{ marginTop: '10px', padding: '8px 12px' }}>
          Add Entry
        </button>
      </form>

      {/* Display entries */}
      {entries.map((entry) => (
        <JournalEntry key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
