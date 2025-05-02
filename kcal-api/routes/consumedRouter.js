import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as consumedController from '../controllers/consumedController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const consumedRouter = express.Router();

consumedRouter.param('consumedId', consumedController.paramConsumedConsumedId)

consumedRouter.get('/', consumedController.getConsumed)
consumedRouter.get('/:consumedId', consumedController.getConsumedConsumedId)

consumedRouter.post('/', consumedController.postConsumed);

consumedRouter.put('/:consumedId', consumedController.putConsumedConsumedId)

consumedRouter.delete('/', consumedController.deleteConsumed)
consumedRouter.delete('/:consumedId', consumedController.deleteConsumedConsumedId)

export default consumedRouter