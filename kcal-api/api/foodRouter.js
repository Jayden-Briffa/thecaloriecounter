const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const foodRouter = express.Router();
const db = new sqlite3.Database(path.join(__dirname, '..', 'database.sqlite'));

// Get all foods
foodRouter.get('/', (req, res, next) => {

    // Ensure that the given orderedBy is valid
    const validFields = ['id', 'name', 'quantity', 'units', 'kcal', 'created_at'];
    let orderedBy = 'id';

    if (validFields.includes(req.query.orderedBy)){
        orderedBy = req.query.orderedBy;

        // If orderedBy was given but is invalid
    } else if (req.query.orderedBy){
        return next(new Error(`Cannot order by field ${req.query.orderedBy}`))
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

    // If a list of ids is given, just get those...
    //...otherwise, get all Foods records
    db.all(`SELECT * FROM Foods${whereClause}ORDER BY ${orderedBy}`, values, (err, rows) => {
        if (err){
            return next(err);
        };

        return res.status(200).json({Foods : rows})
    });
})

foodRouter.param('foodId', (req, res, next) => {
    const id = req.params.foodId
    db.get(`SELECT * FROM Foods WHERE id = ?`, [id], (err, row) => {
        if (err){
            return next(err);
        }

        if (!row){
            return res.status(404).send(`Food not found with id: ${id}`);
        }

        req.foodItem = row;
        return next();
    });
})

foodRouter.get('/:foodId', (req, res, next) => {
    return res.status(200).json(req.foodItem);
})

foodRouter.post('/', (req, res, next) => {
    const food = req.body
    db.run(`INSERT INTO Foods (name, quantity, units, added_by, kcal) VALUES(?, ?, ?, ?, ?)`, [food.name, food.quantity, food.units, 'user', food.kcal], function (err){
        if (err){
            return next(err);
        }

        db.get(`SELECT * FROM Foods WHERE id = ?`, [this.lastID], (err, row) => {
            if (err){
                return next(err);
            }

            return res.status(201).json({Foods: row});
        })
    })
})

foodRouter.put('/:foodId', (req, res, next) => {
    const food = req.body
    db.run(`UPDATE Foods SET name = ?, quantity = ?, units = ?, kcal = ? WHERE id = ?`, [
        food.name, 
        food.quantity, 
        food.units, 
        food.kcal, 
        req.params.foodId
    ], 
        function (err){
        if (err){
            return next(err);
        }

        db.get(`SELECT * FROM Foods WHERE id = ?`, [req.params.foodId], (err, row) => {
            if (err){
                return next(err);
            }

            return res.status(201).json({Foods: row});
        })
    })
})

foodRouter.delete('/:foodId', (req, res, next) => {
    db.run(`DELETE FROM Foods WHERE id = ?`, [req.params.foodId], (err) => {
        if (err){
            return next(err);
        }

        return res.status(204).send();
    })
})

module.exports = foodRouter;