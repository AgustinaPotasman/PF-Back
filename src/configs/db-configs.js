const { Pool } = require('pg');

const config = {
    host: 'localhost',
    database: 'postgres',
    user: 'postgres',
    password: 'root',
    port: 5432,
};

const pool = new Pool(config);

module.exports = pool;
