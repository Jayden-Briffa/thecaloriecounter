import { pool } from '../db.js';
import * as model from '../models/consumedModel.js';

export const get_consumed = async (req, res, next) => {
    try{
        const rows = await model.selectConsumed();
        res.status(200).json({Consumed_Foods : rows});
    } catch (err){
        next(err)
    }
}

export const param_consumed_consumedId = async (req, res, next, id) => {
    try{
        const row = await model.selectConsumed()
    
        if (!row){
            res.status(404).send(`Food not found with id: ${id}`);
        }
    
        req.consumedFood = row;
        next();

    } catch (err){
        next(err);
    }
}

export const get_consumed_consumedId = (req, res, next) => {
    res.status(200).json({Consumed_Food: req.consumedFood});
}

export const post_consumed = async (req, res, next) => {
    try{
        const food = req.body
    
        const result = await model.insertConsumed([
            food.foodId, 
            food.quantity, 
            food.kcal,
            food.dateConsumed
        ]);
    
        const insertId = result.insertId;
    
        const row = await model.selectConsumed(insertId);
    
        res.status(201).json({Consumed_Food: row});

    } catch (err){
        next(err)
    }
}

export const put_consumed_consumedId = async (req, res, next) => {
    try{
        const food = req.body;
    
        const result = await model.updateConsumed([
            food.quantity,
            food.kcal,
            req.consumedFood.id
        ]);
    
        const row = await model.selectConsumed(req.consumedFood.id);
        res.status(200).json({Consumed_Food: row});

    } catch (err){
        next(err);
    }
}

export const delete_consumed = async (req, res, next) => {
    
    try{
        
        let consumedIdsArr;
        let whereClause = ' ';
        let values = [];

        // If a consumedIds value wasn't given, give an error
        if (req.query.consumedIds === undefined){
            return next(new Error('You must provide a foodIds argument'));
        }  

        // Put each ID in an array and generate the where clause...
        //...with a number of parameters equal to the number of IDs
        consumedIdsArr = req.query.consumedIds.split(",").map(Number);

        await model.deleteConsumed(consumedIdsArr);
        res.status(204).send();

    } catch (err){
        next(err);
    }
   
}

export const delete_consumed_consumedId = async (req, res, next) => {

    try{
        await model.deleteConsumed(req.params.consumedId)
        res.status(204).send();
    } catch (err){
        next(err)
    }

}