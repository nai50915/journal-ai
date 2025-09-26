import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JournalEntry from '../components/JournalEntry';

export default function Home() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/entries')
      .then(res => setEntries(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Journal AI Home</h1>
      {entries.map(entry => (
        <JournalEntry key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
