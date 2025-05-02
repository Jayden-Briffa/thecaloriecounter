import express from 'express';
import { pool } from '../db.js';  // Updated for MySQL
import path from 'path';
import { fileURLToPath } from 'url';
import * as foodController from '../controllers/foodController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const foodRouter = express.Router();

// Get all foods
foodRouter.get('/', foodController.getFood);

foodRouter.param('foodId', foodController.paramFoodFoodId);

foodRouter.get('/:foodId', foodController.getFoodFoodId);

foodRouter.post('/', foodController.postFood);

foodRouter.put('/:foodId', foodController.putFoodFoodId);

foodRouter.delete('/:foodId', foodController.deleteFoodFoodId);

export default foodRouter;
