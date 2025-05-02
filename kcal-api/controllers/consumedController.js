import * as model from '../models/consumedModel.js';

export const getConsumed = async (req, res, next) => {
    try{
        const rows = await model.selectConsumed();
        res.status(200).json({Consumed_Foods : rows});
    } catch (err){
        next(err)
    }
}

export const paramConsumedConsumedId = async (req, res, next, id) => {
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

export const getConsumedConsumedId = (req, res, next) => {
    res.status(200).json({Consumed_Food: req.consumedFood});
}

export const postConsumed = async (req, res, next) => {
    try{
        const food = req.body
    
        const result = await model.insertConsumed({...food});
    
        const insertId = result.insertId;
    
        const row = await model.selectConsumed(insertId);
    
        res.status(201).json({Consumed_Food: row});

    } catch (err){
        next(err)
    }
}

export const putConsumedConsumedId = async (req, res, next) => {
    try{
        const food = req.body;
        
        const result = await model.updateConsumed({...food}, req.params.consumedId);
        
        if (result.changedRows === 0){
            throw new Error("The row couldn't be changed", result)
        }

        const row = await model.selectConsumed(req.params.consumedId);
        res.status(200).json({Consumed_Food: row});

    } catch (err){
        next(err);
    }
}

export const deleteConsumed = async (req, res, next) => {
    
    try{
        
        let consumedIdsArr;
        let whereClause = ' ';
        let values = [];

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