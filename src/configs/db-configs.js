const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    database: 'pf',
    user: 'postgres',
    password: 'root',
    port: 5432,
});

module.exports = pool;
