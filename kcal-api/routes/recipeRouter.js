import express from 'express';
import * as controller from '../controllers/recipeController.js';
import ingredientRouter from './ingredientRouter.js' 
import { validateRecipe } from '../middleware/validators/validateRecipe.js';

const recipeRouter = express.Router();

recipeRouter.param('recipeId', controller.paramRecipeRecipeId)

recipeRouter.use('/:recipeId/ingredients', ingredientRouter)

recipeRouter.get('/', controller.getRecipe)
recipeRouter.get('/:recipeId', controller.getRecipeRecipeId)

recipeRouter.post('/', validateRecipe, controller.postRecipe);

recipeRouter.put('/:recipeId', validateRecipe, controller.putRecipeRecipeId)

recipeRouter.delete('/:recipeId', controller.deleteRecipeRecipeId)

export default recipeRouter