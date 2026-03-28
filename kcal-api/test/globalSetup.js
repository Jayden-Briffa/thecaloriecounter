import executeSqlFile from "../executeSqlFile.js";
import { clientOpts, mySqlOpts } from "../db/dbOptions.js";
import mysql from 'mysql2/promise';

export default async function globalSetup() {
    const pool = await mysql.createPool({...clientOpts, ...mySqlOpts, multipleStatements: true});
    await executeSqlFile("./dbSchema.sql", pool, process.env.MYSQL_DATABASE, process.env.MYSQL_TEST_DATABASE);
    await pool.end()
}