import * as model from '../models/foodModel.js';

export const getFood = async (req, res, next) => {

    // Ensure that the given orderedBy is valid
    const validFields = ['id', 'name', 'quantity', 'units', 'kcal', 'created_at'];
    let orderedBy = 'id';

    if (validFields.includes(req.query.orderedBy)){
        orderedBy = req.query.orderedBy;
    } else if (req.query.orderedBy){
        return next(new Error(`Cannot order by field ${req.query.orderedBy}`));
    }

    try{
        let rows;
        if (req.query.foodIds){
            // Parse foodIds into an array
            const foodIdsArr = req.query.foodIds.split(",");
            rows = await model.selectFood({id: foodIdsArr, orderedBy: orderedBy});
            
        } else {
            rows = await model.selectFood({userId: res.locals.user.id, orderedBy: orderedBy});
        }
        
        res.status(200).json({Foods: rows});
    } catch (err) {
        next(err);
    }
    
}

export const paramFoodFoodId = async (req, res, next, id) => {
    try {
        const row = await model.selectFood({id});

        if (!row) {
            return res.status(404).send(`Food not found with id: ${id}`);
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

export const getFoodFoodId = (req, res, next) => {
    res.status(200).json({Food: req.foodItem});
}

export const postFood = async (req, res, next) => {
    const food = req.body;
    food.userId = res.locals.user.id
    try {
        const result = await model.insertFood(food);

        const row = await model.selectFood({id: result.insertId});
        res.status(201).json({Food: row});
    } catch (err) {
        next(err);
    }
}

export const putFoodFoodId = async (req, res, next) => {
    const food = req.body;
    const id = req.params.foodId

    try {
        await model.updateFood(food, id);

        const row = await model.selectFood(id);
        res.status(200).json({Food: row});
    } catch (err) {
        next(err);
    }
}

export const deleteFoodFoodId = async (req, res, next) => {
    try {
        await model.deleteFood({id: req.params.foodId});
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}