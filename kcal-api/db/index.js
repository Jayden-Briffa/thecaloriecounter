let pool, connector;

if (process.env.NODE_ENV === 'test') {
  const db = await import('./dbTest.js');
  pool = db.pool;
  connector = db.connector;
} else {
  const db = await import('./db.js');
  pool = db.pool;
  connector = db.connector;
}

export { pool, connector };