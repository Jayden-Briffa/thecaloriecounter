const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const consumedRouter = express.Router();
const db = new sqlite3.Database(path.join(__dirname, '..', 'database.sqlite'));

consumedRouter.get('/', (req, res, next) => {
    db.all(`SELECT * FROM Consumed_Foods`, (err, rows) => {
        if (err){
            return next(err);
        }

        return res.status(200).json({Consumed_Foods : rows});
    })
})

consumedRouter.param('consumedId', (req, res, next) => {
    const id = req.params.consumedId
    db.get(`SELECT * FROM Consumed_Foods WHERE id = ?`, [id], (err, row) => {
        if (err){
            return next(err);
        }

        if (!row){
            return res.status(404).send(`Food not found with id: ${id}`);
        }

        req.consumedFood = row;
        return next();
    });
})

consumedRouter.get('/:consumedId', (req, res, next) => {
    return res.status(200).json({Consumed_Food: req.consumedFood});
})

consumedRouter.post('/', (req, res, next) => {
    const food = req.body
    
    db.run(`INSERT INTO Consumed_Foods (food_id, quantity, kcal, date_consumed) VALUES(?, ?, ?, ?)`, [
        food.foodId, 
        food.quantity, 
        food.kcal,
        food.dateConsumed
    ], 
    
    function (err){
        if (err){
            return next(err);
        }

        db.get(`SELECT * FROM Consumed_Foods WHERE id = ?`, [this.lastID], (err, row) => {
            if (err){
                return next(err);
            }

            return res.status(201).json({Consumed_Food: row});
        })
    })
})

consumedRouter.put('/:consumedId', (req, res, next) => {
    const food = req.body;
    
    db.run(`UPDATE Consumed_Foods SET quantity = ?, kcal = ? WHERE id = ?`, [
        food.quantity,
        food.kcal,
        req.params.consumedId
    ], 
        function (err){
        if (err){
            return next(err);
        }

        db.get(`SELECT * FROM Consumed_Foods WHERE id = ?`, [req.params.consumedId], (err, row) => {
            if (err){
                return next(err);
            }

            return res.status(201).json({Consumed_Food: row});
        })
    })
})

consumedRouter.delete('/', (req, res, next) => {
    
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

    db.run(`DELETE FROM Consumed_Foods ${whereClause}`, values, (err) => {
        if (err){
            return next(err);
        }
    
        return res.status(204).send();
    }) 
})

consumedRouter.delete('/:consumedId', (req, res, next) => {

    db.run(`DELETE FROM Consumed_Foods WHERE id = ?`, [req.params.consumedId], (err) => {
        if (err){
            return next(err);
        }
    
        return res.status(204).send();
    })
})

module.exports = consumedRouter;