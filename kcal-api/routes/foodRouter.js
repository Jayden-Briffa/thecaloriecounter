import express from 'express';
import * as controller from '../controllers/foodController.js';

const foodRouter = express.Router();

foodRouter.param('foodId', controller.paramFoodFoodId);

foodRouter.get('/', controller.getFood);
foodRouter.get('/:foodId', controller.getFoodFoodId);

foodRouter.post('/', controller.postFood);

foodRouter.put('/:foodId', controller.putFoodFoodId);

foodRouter.delete('/:foodId', controller.deleteFoodFoodId);

export default foodRouter;
