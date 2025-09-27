const express = require('express');
const cors = require('cors');
const entriesRouter = require('./routes/entries'); // <- import router

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

// Use the entries route
app.use('/entries', entriesRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
