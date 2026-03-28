import { selectFood } from "../models/foodModel.js";

export function extractFood(req, res, next){
    let food;
    if (req.body){
        food = selectFood({id: req.body.food_id, userId: req.locals.user.id});

    } else if (req.params.ingredientId){
        food = selectFood({id: req.locals.ingredient.food_id, userId: req.locals.user.id});
    }

    if (food.user_id === req.locals.recipe.user_id){
        req.locals.food = food
    }

    next()
}     