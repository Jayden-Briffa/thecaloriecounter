import { ResourceNotFoundError } from '../errors/ResourceNotFoundError.js';
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
            rows = await model.selectRecipe({user_id: req.locals.user.id, id: req.locals.ids});
        } else {
            rows = await model.selectRecipe({user_id: req.locals.user.id, orderedBy: req.query.orderedBy});
        }
        
        res.status(200).json({Recipes: rows});
    } catch (err) {
        next(err);
    }
    
}

export const paramRecipeRecipeId = async (req, res, next, id) => {
    try {
        const row = await model.selectRecipe({id, user_id: req.locals.user.id});

        if (row == undefined) {
            return next(new ResourceNotFoundError({
                resourceType: "recipe", 
                resourceId: id
            }));
        }
        
        req.locals.recipe = row;
        next();
    } catch (err) {
        next(err);
    }
}

export const getRecipeRecipeId = (req, res, next) => {
    return res.status(200).json({Recipe: req.locals.recipe});
}

export const postRecipe = async (req, res, next) => {
    const recipe = req.body;
    recipe.user_id = req.locals.user.id

    try {
        const result = await model.insertRecipe(recipe);

        const row = await model.selectRecipe({id: result.insertId, user_id: req.locals.user.id});
        return res.status(201).json({Recipe: row});
    } catch (err) {
        next(err);
    }
}

export const putRecipeRecipeId = async (req, res, next) => {
    const recipe = req.body;
    const id = req.params.recipeId

    try {
        await model.updateRecipe(recipe, id);

        const row = await model.selectRecipe({id, user_id: req.locals.user.id});
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