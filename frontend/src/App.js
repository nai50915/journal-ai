import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const res = await axios.get('http://localhost:5001/entries');
      setEntries(res.data);
    } catch (err) {
      console.error('Error posting entry:', err.response ? err.response.data : err.message);
      alert('Failed to add entry. Check backend console.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newEntry) return;
    try {
      await axios.post('http://localhost:5001/entries', { text: newEntry });
      setNewEntry('');
      fetchEntries(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>Journal AI</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          rows={4}
          style={{ width: '100%' }}
          placeholder="Write a new journal entry..."
        />
        <button type="submit" style={{ marginTop: 10 }}>Add Entry</button>
      </form>

      <h2>Existing Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            {entry.text} {entry.sentiment ? `- ${entry.sentiment}` : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
