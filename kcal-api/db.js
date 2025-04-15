import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
import { Connector } from '@google-cloud/cloud-sql-connector';

// Connect to google cloud
const connector = new Connector();
const clientOpts = await connector.getOptions({
    instanceConnectionName: process.env.CONNECTION_NAME,
    ipType: 'PUBLIC'
})

// Create a connection pool for google cloud
const pool = await mysql.createPool({
    ...clientOpts,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

export {pool, connector}