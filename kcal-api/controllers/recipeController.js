import * as model from '../models/recipeModel.js';
import { validateQueryOrderedBy } from '../utils/validateQueryOrderedBy.js';

export const getRecipe = async (req, res, next) => {
    try{
        let rows;
        
        const validFields = ["id", "name", "instructions", "measure_quantity", "units", "created_at"]
        const orderedByErr = validateQueryOrderedBy(req.query.orderedBy, validFields)

        if (orderedByErr != null){
            return next(orderedByErr)
        } // else continue as normal

        if (req.locals.ids){
            rows = await model.selectRecipe({userId: req.locals.user.id, id: req.locals.ids});
        } else {
            rows = await model.selectRecipe({userId: req.locals.user.id, orderedBy: req.query.orderedBy});
        }
        
        res.status(200).json({Recipes: rows});
    } catch (err) {
        next(err);
    }
    
}

export const paramRecipeRecipeId = async (req, res, next, id) => {
    try {
        const row = await model.selectRecipe({id});

        if (!row) {
            return res.status(404).send(`Recipe not found with id: ${id}`);
        } 

        req.foodItem = row;

        if (req.foodItem.user_id !== req.locals.user.id){
            return res.status(403).json({errors: {forbidden: "You cannot do anything to a food item you didn't add"}})
        }

        next();
    } catch (err) {
        next(err);
    }
}

export const getRecipeRecipeId = (req, res, next) => {
    res.status(200).json({Recipe: req.foodItem});
}

export const postRecipe = async (req, res, next) => {
    const recipe = req.body;
    recipe.userId = req.locals.user.id
    try {
        const result = await model.insertRecipe(recipe);

        const row = await model.selectRecipe({id: result.insertId});
        res.status(201).json({Recipe: row});
    } catch (err) {
        next(err);
    }
}

export const putRecipeRecipeId = async (req, res, next) => {
    const recipe = req.body;
    const id = req.params.recipeId

    try {
        await model.updateRecipe(recipe, id);

        const row = await model.selectRecipe(id);
        res.status(200).json({Recipe: row});
    } catch (err) {
        next(err);
    }
}

export const deleteRecipeRecipeId = async (req, res, next) => {
    try {
        await model.deleteRecipe({id: req.params.recipeId});
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}