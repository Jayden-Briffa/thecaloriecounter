import { ResourceNotFoundError } from '../errors/ResourceNotFoundError.js';
import { isNotProvided } from '../middleware/validators/validators.js';
import { selectFood } from '../models/foodModel.js';
import * as model from '../models/ingredientModel.js';

export const getIngredients = async (req, res, next) => {
    try{
        let rows;
        if (req.locals.ids){
            rows = await model.selectIngredient({id: req.locals.ids});
        } else {
            rows = await model.selectIngredient({recipe_id: req.locals.recipe.id});
        }
        
        res.status(200).json({Ingredients: rows});
    } catch (err) {
        next(err);
    }
    
}

export const paramIngredientsIngredientId = async (req, res, next, id) => {
    try {
        const row = await model.selectIngredient({id, recipe_id: req.locals.recipe.id});

        if (!row) {
            return next(new ResourceNotFoundError({
                resourceType: "ingredient", 
                resourceId: id
            }))
        } 

        req.locals.ingredient = row;
        req.locals.ingredient.recipe_id = req.locals.recipe.id

        next();
    } catch (err) {
        next(err);
    }
}

export const getIngredientsIngredientId = (req, res, next) => {
    res.status(200).json({Ingredient: req.locals.ingredient});
}

export const postIngredients = async (req, res, next) => {
    const ingredient = req.body;
    ingredient.recipe_id = req.locals.recipe.id
    
    try {
        const result = await model.insertIngredient(ingredient);

        const row = await model.selectIngredient({id: result.insertId, recipe_id: req.locals.recipe.id});
        res.status(201).json({Ingredient: row});
    } catch (err) {
        next(err);
    }
}

export const putIngredientsIngredientId = async (req, res, next) => {
    const ingredient = req.body;
    ingredient.recipe_id = req.locals.recipe.id

    const id = req.params.ingredientId

    try {
        await model.updateIngredient(ingredient, id);

        const row = await model.selectIngredient({id, recipe_id: req.locals.recipe.id});
        res.status(200).json({Ingredient: row});
    } catch (err) {
        next(err);
    }
}

export const deleteIngredientsIngredientId = async (req, res, next) => {
    try {
        await model.deleteIngredients({id: req.params.ingredientId});
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}

export const deleteIngredients = async (req, res, next) => {
    try {
        await model.deleteIngredients({recipe_id: req.locals.recipe.id})
        res.status(204).send()
    } catch (err) {
        next(err);
    }
}