import express from 'express';
import { pool } from '../db.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const consumedRouter = express.Router();

consumedRouter.get('/', async (req, res, next) => {
    try{
        const [rows] = await pool.query(`SELECT * FROM Consumed_Foods`);
        res.status(200).json({Consumed_Foods : rows});
    } catch (err){
        next(err)
    }
})

consumedRouter.param('consumedId', async (req, res, next, id) => {
    try{
        const [[row]] = await pool.query(`SELECT * FROM Consumed_Foods WHERE id = ?`, [id])
    
        if (!row){
            res.status(404).send(`Food not found with id: ${id}`);
        }
    
        req.consumedFood = row;
        next();

    } catch (err){
        next(err);
    }
})

consumedRouter.get('/:consumedId', (req, res, next) => {
    res.status(200).json({Consumed_Food: req.consumedFood});
})

consumedRouter.post('/', async (req, res, next) => {
    try{
        const food = req.body
    
        const [result] = await pool.query(`INSERT INTO Consumed_Foods (food_id, quantity, kcal, date_consumed) VALUES(?, ?, ?, ?)`, [
            food.foodId, 
            food.quantity, 
            food.kcal,
            food.dateConsumed
        ]);
    
        const insertId = result.insertId;
    
        const [[row]] = await pool.query(`SELECT * FROM Consumed_Foods WHERE id = ?`, [insertId]);
    
        res.status(201).json({Consumed_Food: row});

    } catch (err){
        next(err)
    }
});

consumedRouter.put('/:consumedId', async (req, res, next) => {
    try{
        const food = req.body;
    
        const [result] = await pool.query(`UPDATE Consumed_Foods SET quantity = ?, kcal = ? WHERE id = ?`, [
            food.quantity,
            food.kcal,
            req.consumedFood.id
        ]);
    
        const [[row]] = await pool.query(`SELECT * FROM Consumed_Foods WHERE id = ?`, [req.consumedFood.id]);
        res.status(200).json({Consumed_Food: row});

    } catch (err){
        next(err);
    }
})

consumedRouter.delete('/', async (req, res, next) => {
    
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
        const placeholders = consumedIdsArr.map(() => "?").join();
        whereClause = `WHERE id IN (${placeholders})`;

        values = consumedIdsArr;

        await pool.query(`DELETE FROM Consumed_Foods ${whereClause}`, values)
        res.status(204).send();
    } catch (err){
        next(err);
    }
   
})

consumedRouter.delete('/:consumedId', async (req, res, next) => {

    try{
        await pool.query(`DELETE FROM Consumed_Foods WHERE id = ?`, [req.params.consumedId])
        res.status(204).send();
    } catch (err){
        next(err)
    }

})

export default consumedRouter