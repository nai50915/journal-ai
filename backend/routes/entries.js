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
  

module.exports = router;
