import express from 'express';
import * as controller from '../controllers/ingredientController.js';
import { validateIngredient } from '../middleware/validators/validateIngredient.js';
import { extractFood } from '../middleware/extractFood.js';

const ingredientRouter = express.Router();

ingredientRouter.param('ingredientId', controller.paramIngredientsIngredientId)

ingredientRouter.get('/', controller.getIngredients)
ingredientRouter.get('/:ingredientId', controller.getIngredientsIngredientId)

ingredientRouter.post('/', extractFood, validateIngredient, controller.postIngredients);

ingredientRouter.put('/:ingredientId', extractFood, validateIngredient, controller.putIngredientsIngredientId)

ingredientRouter.delete('/', controller.deleteIngredients)
ingredientRouter.delete('/:ingredientId', controller.deleteIngredientsIngredientId)

export default ingredientRouter