
import { clientOpts, mySqlOpts } from "../db/dbOptions.js";
import mysql from 'mysql2/promise';

export default async function globalTeardown() {
    const pool = await mysql.createPool({...clientOpts, ...mySqlOpts, multipleStatements: true});
    await pool.query(`DROP DATABASE ${process.env.MYSQL_TEST_DATABASE}`)
    await pool.end()
}