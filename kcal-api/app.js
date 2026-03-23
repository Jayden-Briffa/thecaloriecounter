// Import dependencies
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
const app = express();

// Import routers
import apiRouter from './routes/api.js';

// Mount dependencies
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({origin: true, credentials: true}));

// Mount endpoints
app.use('/api', apiRouter);

export default app;