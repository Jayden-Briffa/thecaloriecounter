import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2/promise';
import { Connector } from '@google-cloud/cloud-sql-connector';

// Connect to google cloud
const connector = new Connector();

// Connect to local or remote database depending on environment
let clientOpts;
if (process.env.USE_REMOTE_DB === 'true') {
    clientOpts = await connector.getOptions({
        instanceConnectionName: process.env.CONNECTION_NAME,
        ipType: 'PUBLIC'
    })
} else {
    clientOpts = {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT
    }
}

// Create a connection pool for google cloud
const pool = await mysql.createPool({
    ...(clientOpts || {}),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

export {pool, connector}