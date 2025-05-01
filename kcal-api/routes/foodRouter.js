import express from 'express';
import { pool } from '../db.js';  // Updated for MySQL
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const foodRouter = express.Router();

// Get all foods
foodRouter.get('/', async (req, res, next) => {

    // Ensure that the given orderedBy is valid
    const validFields = ['id', 'name', 'quantity', 'units', 'kcal', 'created_at'];
    let orderedBy = 'id';

    if (validFields.includes(req.query.orderedBy)){
        orderedBy = req.query.orderedBy;
    } else if (req.query.orderedBy){
        return next(new Error(`Cannot order by field ${req.query.orderedBy}`));
    }

    let foodIdsArr;
    let whereClause = ' ';
    let values = [];
    if (req.query.foodIds){
        // Put each ID in an array and generate the where clause...
        //...with a number of parameters equal to the number of IDs
        foodIdsArr = req.query.foodIds.split(",");
        const placeholders = foodIdsArr.map(() => "?").join();
        whereClause = foodIdsArr ? ` WHERE id IN (${placeholders}) ` : ' ';
        values = foodIdsArr;
    }

    try {
        const [rows] = await pool.query(`SELECT * FROM Foods${whereClause}ORDER BY ${orderedBy}`, values);
        res.status(200).json({Foods: rows});
    } catch (err) {
        next(err);
    }
});

foodRouter.param('foodId', async (req, res, next, id) => {
    try {
        const [[row]] = await pool.query(`SELECT * FROM Foods WHERE id = ?`, [id]);

        if (!row) {
            return res.status(404).send(`Food not found with id: ${id}`);
        }

        req.foodItem = row;
        next();
    } catch (err) {
        next(err);
    }
});

foodRouter.get('/:foodId', (req, res, next) => {
    res.status(200).json({Food: req.foodItem});
});

foodRouter.post('/', async (req, res, next) => {
    const food = req.body;
    try {
        const [result] = await pool.query(`INSERT INTO Foods (name, quantity, units, added_by, kcal) VALUES (?, ?, ?, ?, ?)`, [
            food.name,
            food.quantity,
            food.units,
            'user',
            food.kcal
        ]);

        const [[row]] = await pool.query(`SELECT * FROM Foods WHERE id = ?`, [result.insertId]);
        res.status(201).json({Food: row});
    } catch (err) {
        next(err);
    }
});

foodRouter.put('/:foodId', async (req, res, next) => {
    const food = req.body;
    try {
        await pool.query(`UPDATE Foods SET name = ?, quantity = ?, units = ?, kcal = ? WHERE id = ?`, [
            food.name,
            food.quantity,
            food.units,
            food.kcal,
            req.params.foodId
        ]);

        const [[row]] = await pool.query(`SELECT * FROM Foods WHERE id = ?`, [req.params.foodId]);
        res.status(200).json({Food: row});
    } catch (err) {
        next(err);
    }
});

foodRouter.delete('/:foodId', async (req, res, next) => {
    try {
        await pool.query(`DELETE FROM Foods WHERE id = ?`, [req.params.foodId]);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

export default foodRouter;
