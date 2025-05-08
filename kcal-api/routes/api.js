import express from 'express';
const apiRouter = express.Router();

import errorhandler from 'errorhandler';
import kcalRouter from './kcalRouter.js';
import foodRouter from './foodRouter.js';
import consumedRouter from './consumedRouter.js';
import authRouter from './authRouter.js';
import { checkuser, requireAuth } from '../middleware/authMiddleware.js';
import cookieParser from 'cookie-parser';

apiRouter.use(errorhandler());
apiRouter.use(cookieParser())
apiRouter.use(checkuser)
apiRouter.use('/foods', requireAuth, foodRouter);
apiRouter.use('/consumed', consumedRouter);
apiRouter.use('/kcal', kcalRouter);
apiRouter.use('/auth', authRouter)

export default apiRouter;