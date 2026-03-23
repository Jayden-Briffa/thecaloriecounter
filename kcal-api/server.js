import 'dotenv/config';
import app from './app.js';
import {connector, pool} from "./db/index.js";

// Cleanup database connection after shutdown
process.on('SIGINT', async () => {
    await pool.end();
    connector.close();
    process.exit(0);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});

