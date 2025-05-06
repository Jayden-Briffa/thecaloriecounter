import express from 'express';
const apiRouter = express.Router();

import errorhandler from 'errorhandler';
import kcalRouter from './kcalRouter.js';
import foodRouter from './foodRouter.js';
import consumedRouter from './consumedRouter.js';
import authRouter from './authRouter.js';

apiRouter.use(errorhandler());
apiRouter.use('/foods', foodRouter);
apiRouter.use('/consumed', consumedRouter);
apiRouter.use('/kcal', kcalRouter);
apiRouter.use('/auth', authRouter)

export default apiRouter;