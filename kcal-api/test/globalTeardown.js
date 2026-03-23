// test/globalTeardown.js
import { pool } from "../db/index.js";

export default async () => {
  await pool.end();
};