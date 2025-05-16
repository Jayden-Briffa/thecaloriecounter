import * as model from '../models/consumedModel.js';

export const getConsumed = async (req, res, next) => {
    try{
        const rows = await model.selectConsumed({userId: res.locals.user.id});
        res.status(200).json({Consumed_Foods : rows});
    } catch (err){
        next(err)
    }
}

export const paramConsumedConsumedId = async (req, res, next, id) => {
    try{
        const row = await model.selectConsumed({id})
    
        if (!row){
            return res.status(404).send(`Food not found with id: ${id}`);
        }
    
        req.consumedFood = row;

         if (req.foodItem.user_id !== res.locals.user.id){
            return res.status(403).json({errors: {forbidden: "You cannot do anything to a consumed food item you didn't add"}})
        }

        next();

    } catch (err){
        next(err);
    }
}

export const getConsumedConsumedId = (req, res, next) => {
    res.status(200).json({Consumed_Food: req.consumedFood});
}

export const postConsumed = async (req, res, next) => {
    try{
        let food = req.body;
        food.userId = res.locals.user.id;
    
        const result = await model.insertConsumed(food);
    
        const row = await model.selectConsumed({id: result.insertId});
    
        res.status(201).json({Consumed_Food: row});

    } catch (err){
        next(err)
    }
}

export const putConsumedConsumedId = async (req, res, next) => {
    try{
        const food = req.body;
        const id = req.params.consumedId;

        const result = await model.updateConsumed(food, id);
        
        if (result.changedRows === 0){
            throw new Error("The row couldn't be changed", result)
        }

        const row = await model.selectConsumed({id});
        res.status(200).json({Consumed_Food: row});

    } catch (err){
        next(err);
    }
}

export const deleteConsumed = async (req, res, next) => {
    
    try{
        
        let consumedIdsArr;

        // If a consumedIds value wasn't given, give an error
        if (req.query.consumedIds === undefined){
            return next(new Error('You must provide a foodIds argument'));
        }  

        // Parse foodIds into an array
        consumedIdsArr = req.query.consumedIds.split(",").map(Number);

        await model.deleteConsumed(consumedIdsArr);
        res.status(204).send();

    } catch (err){
        next(err);
    }
   
}

export const deleteConsumedConsumedId = async (req, res, next) => {

    try{
        await model.deleteConsumed(req.params.consumedId)
        res.status(204).send();
    } catch (err){
        next(err)
    }

}