// Import dependencies
import 'dotenv/config'
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import errorhandler from 'errorhandler';
import { pool, connector } from './db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 8080;

// Import routers
import pageRouter from './pageRouter.js';
import apiRouter from './routes/api.js';

// Mount dependencies
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(errorhandler());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mount endpoints
//app.use('/', pageRouter); // Allows routing by slug name
//app.use(express.static(path.join(__dirname, 'public'))); // Allows routing by file name
app.use('/api', apiRouter);

// Start server
app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT)
})

// Cleanup database connection after shutdown
process.on('SIGINT', async () => {
    await pool.end();
    connector.close();
    process.exit(0);
});