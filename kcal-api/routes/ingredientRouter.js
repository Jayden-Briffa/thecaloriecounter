import express from 'express';
import * as controller from '../controllers/ingredientController.js';

const ingredientRouter = express.Router();

ingredientRouter.param('ingredientId', controller.paramIngredientIngredientId)

ingredientRouter.get('/', controller.getIngredient)
ingredientRouter.get('/:ingredientId', controller.getIngredient)

ingredientRouter.post('/', controller.postIngredient);

ingredientRouter.put('/:ingredientId', controller.putIngredientIngredientId)

ingredientRouter.delete('/:ingredientId', controller.deleteIngredientIngredientId)

export default ingredientRouter