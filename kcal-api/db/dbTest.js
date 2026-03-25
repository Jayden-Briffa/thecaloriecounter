import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
import { clientOpts, mySqlOpts } from './dbOptions.js';

// Create a connection pool
const pool = await mysql.createPool({
    ...(clientOpts || {}),
    ...(mySqlOpts || {}),
    database: process.env.MYSQL_TEST_DATABASE,
})

export { pool }