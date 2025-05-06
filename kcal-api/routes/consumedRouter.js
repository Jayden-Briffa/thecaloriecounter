import express from 'express';
import * as controller from '../controllers/consumedController.js';

const consumedRouter = express.Router();

consumedRouter.param('consumedId', controller.paramConsumedConsumedId)

consumedRouter.get('/', controller.getConsumed)
consumedRouter.get('/:consumedId', controller.getConsumedConsumedId)

consumedRouter.post('/', controller.postConsumed);

consumedRouter.put('/:consumedId', controller.putConsumedConsumedId)

consumedRouter.delete('/', controller.deleteConsumed)
consumedRouter.delete('/:consumedId', controller.deleteConsumedConsumedId)

export default consumedRouter