const { Pool } = require('pg');

const pool = new Pool({
  user: 'nadiaismail',        // your username
  host: 'localhost',
  database: 'journal_ai',     // the database you just created
  password: '',  // whatever password you set (or leave empty if none)
  port: 5432
});

module.exports = pool;
