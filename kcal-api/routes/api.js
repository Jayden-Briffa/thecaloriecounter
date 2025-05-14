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
apiRouter.use('/auth', authRouter);
apiRouter.use('/foods', requireAuth, foodRouter);
apiRouter.use('/consumed', requireAuth, consumedRouter);
apiRouter.use('/kcal', requireAuth, kcalRouter);

export default apiRouter;