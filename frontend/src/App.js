import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5001/entries')
      .then(res => setData(res.data))
      .catch(err => console.error('Error fetching:', err));
  }, []);

  return (
    <div>
      <h1>Backend Test</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
