import express from 'express';
const apiRouter = express.Router();

import errorhandler from 'errorhandler';
import path from 'path';
import { fileURLToPath } from 'url';

import kcalRouter from './kcalRouter.js';
import foodRouter from './foodRouter.js';
import consumedRouter from './consumedRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

apiRouter.use(errorhandler());
apiRouter.use('/foods', foodRouter);
apiRouter.use('/consumed', consumedRouter);
apiRouter.use('/kcal', kcalRouter);

export default apiRouter;