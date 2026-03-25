import executeSqlFile from "../executeSqlFile";
import { clientOpts, mySqlOpts } from "../db/dbOptions.js";
import mysql from 'mysql2/promise';

export default async function globalSetup() {
    const pool = await mysql.createPool({...clientOpts, ...mySqlOpts});
    await executeSqlFile("../dbSchema.sql", pool, process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, process.env.MYSQL_HOST, process.env.MYSQL_TEST_DATABASE);
}