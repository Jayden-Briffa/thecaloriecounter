import express from 'express';
import * as controller from '../controllers/kcalController.js';

const kcalRouter = express.Router();

kcalRouter.param('logId', controller.paramLogId);

kcalRouter.get('/', controller.getKcal);
kcalRouter.get('/:logId', controller.getKcalLogId);

kcalRouter.post('/', controller.postKcal);

kcalRouter.put('/:logId', controller.putKcalLogId);

kcalRouter.delete('/:logId', controller.deleteKcalLogId);

export default kcalRouter;
