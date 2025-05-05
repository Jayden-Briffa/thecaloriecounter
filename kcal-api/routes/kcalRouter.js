import express from 'express';
import { pool } from '../db.js';  // Updated for MySQL
import path from 'path';
import { fileURLToPath } from 'url';
import * as kcalController from '../controllers/kcalController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const kcalRouter = express.Router();

kcalRouter.get('/', kcalController.getKcal);

kcalRouter.param('logId', kcalController.paramLogId);

kcalRouter.get('/:logId', kcalController.getKcalLogId);

kcalRouter.post('/', kcalController.postKcal);

kcalRouter.put('/:logId', kcalController.putKcalLogId);

kcalRouter.delete('/:logId', kcalController.deleteKcalLogId);

export default kcalRouter;
