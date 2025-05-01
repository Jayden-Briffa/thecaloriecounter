import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as consumedController from '../controllers/consumedController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const consumedRouter = express.Router();

consumedRouter.param('consumedId', consumedController.param_consumed_consumedId)

consumedRouter.get('/', consumedController.get_consumed)
consumedRouter.get('/:consumedId', consumedController.get_consumed_consumedId)

consumedRouter.post('/', consumedController.post_consumed);

consumedRouter.put('/:consumedId', consumedController.put_consumed_consumedId)

consumedRouter.delete('/', consumedController.delete_consumed)
consumedRouter.delete('/:consumedId', consumedController.delete_consumed_consumedId)

export default consumedRouter