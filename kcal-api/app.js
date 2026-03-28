
import dotenv from "dotenv";
dotenv.config();

// Import dependencies
import express from 'express';
import cors from 'cors';
const app = express();

// Import routers
import apiRouter from './routes/api.js';
import morgan from "morgan";

// Mount dependencies
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({origin: true, credentials: true}));
if (process.env.NODE_ENV != "test")
    app.use(morgan("dev"))

// Mount endpoints
app.use('/api', apiRouter);

export default app;