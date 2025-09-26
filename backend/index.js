const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Placeholder entries route
app.get('/entries', (req, res) => {
  res.json([
    { id: 1, text: 'First journal entry', sentiment: 'Neutral' },
    { id: 2, text: 'Second journal entry', sentiment: 'Positive' }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
