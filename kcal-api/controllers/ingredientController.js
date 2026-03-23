import * as model from '../models/ingredientModel.js';

export const getIngredient = async (req, res, next) => {
    try{
        let rows;
        if (req.locals.ids){
            rows = await model.selectIngredient({id: req.locals.ids});
        } else {
            rows = await model.selectIngredient({userId: res.locals.user.id, orderedBy: orderedBy});
        }
        
        res.status(200).json({Ingredients: rows});
    } catch (err) {
        next(err);
    }
    
}

export const paramIngredientIngredientId = async (req, res, next, id) => {
    try {
        const row = await model.selectIngredient({id});

        if (!row) {
            return res.status(404).send(`Ingredient not found with id: ${id}`);
        } 

        req.foodItem = row;

        if (req.foodItem.user_id !== res.locals.user.id){
            return res.status(403).json({errors: {forbidden: "You cannot do anything to a food item you didn't add"}})
        }

        next();
    } catch (err) {
        next(err);
    }
}

export const getIngredientIngredientId = (req, res, next) => {
    res.status(200).json({Ingredient: req.foodItem});
}

export const postIngredient = async (req, res, next) => {
    const ingredient = req.body;
    ingredient.userId = res.locals.user.id
    try {
        const result = await model.insertIngredient(ingredient);

        const row = await model.selectIngredient({id: result.insertId});
        res.status(201).json({Ingredient: row});
    } catch (err) {
        next(err);
    }
}

export const putIngredientIngredientId = async (req, res, next) => {
    const ingredient = req.body;
    const id = req.params.ingredientId

    try {
        await model.updateIngredient(ingredient, id);

        const row = await model.selectIngredient(id);
        res.status(200).json({Ingredient: row});
    } catch (err) {
        next(err);
    }
}

export const deleteIngredientIngredientId = async (req, res, next) => {
    try {
        await model.deleteIngredient({id: req.params.ingredientId});
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}