const express = require('express');
const cors = require('cors');
const entriesRouter = require('./routes/entries'); // <- import router
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const { spawn } = require('child_process');
const PORT = 5001;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'nadiaismail',
  host: 'localhost',
  database: 'journal_ai',
  port: 5432,
});

// Call Python AI
function getSentiment(text) {
  return new Promise((resolve, reject) => {
    const process = spawn('python3', ['../ai/inference.py', text]);

    let result = '';
    process.stdout.on('data', (data) => {
      result += data.toString();
    });

    process.stderr.on('data', (data) => {
      console.error(`AI Error: ${data}`);
    });

    process.on('close', () => {
      resolve(result.trim());
    });
  });
}

app.get('/entries', async (req, res) => {
  const result = await pool.query('SELECT * FROM entries ORDER BY created_at DESC');
  const entriesWithSentiment = await Promise.all(
    result.rows.map(async (row) => ({
      ...row,
      sentiment: row.sentiment || await getSentiment(row.text)
    }))
  );
  res.json(entriesWithSentiment);  
  /* const result = await pool.query('SELECT * FROM entries ORDER BY created_at DESC');
  res.json(result.rows);*/
});

app.post('/entries', async (req, res) => {
  const { text } = req.body;
  const sentiment = await getSentiment(text);

  const result = await pool.query(
    'INSERT INTO entries (text, sentiment) VALUES ($1, $2) RETURNING *',
    [text, sentiment]
  );

  res.json(result.rows[0]);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
