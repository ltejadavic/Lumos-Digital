const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gestor_clases',
  password: 'luis0512',
  port: 5433,
});

module.exports = pool;