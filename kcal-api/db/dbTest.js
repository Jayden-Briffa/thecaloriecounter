import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';

// Connect to local db for testing
let clientOpts
clientOpts = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT
}

// Create a connection pool
const pool = await mysql.createPool({
    ...(clientOpts || {}),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_TEST_DATABASE,
})

export {pool, connector}