const express = require('express');
const router = express.Router();
const pool = require('../utils/db'); // DB connection

// GET all entries
router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM entries ORDER BY created_at DESC');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
  router.post('/', async (req, res) => {
    const { text, sentiment } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO entries (text, sentiment) VALUES ($1, $2) RETURNING *',
        [text, sentiment || null]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
  
module.exports = router;
