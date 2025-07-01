// Import dependencies
import 'dotenv/config'
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import errorhandler from 'errorhandler';
import { pool, connector } from './db.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Import routers
import apiRouter from './routes/api.js';

// Mount dependencies
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({origin: true, credentials: true}));
app.use(errorhandler());

// Mount endpoints
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