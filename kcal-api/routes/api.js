import express from 'express';
const apiRouter = express.Router();

import kcalRouter from './kcalRouter.js';
import foodRouter from './foodRouter.js';
import consumedRouter from './consumedRouter.js';
import recipeRouter from './recipeRouter.js';
import authRouter from './authRouter.js';
import { handleError } from '../middleware/handleError.js';
import { checkuser, requireAuth } from '../middleware/authMiddleware.js';
import { extractIds } from '../middleware/extractIds.js';
import { reqInit } from '../middleware/reqInit.js'
import { cleanReqBody } from '../middleware/cleanReqBody.js';
import { cleanResBody } from '../middleware/cleanResBody.js';

apiRouter.use(reqInit)
apiRouter.use(checkuser);
apiRouter.use(extractIds)
apiRouter.use('/auth', authRouter);
apiRouter.use('/foods', requireAuth, foodRouter);
apiRouter.use('/consumed', requireAuth, consumedRouter);
apiRouter.use('/kcal', requireAuth, kcalRouter);
apiRouter.use('/recipes', requireAuth, cleanReqBody, recipeRouter, cleanResBody)
apiRouter.use(handleError)

export default apiRouter;