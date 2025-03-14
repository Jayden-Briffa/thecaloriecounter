const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const foodRouter = express.Router();
const db = new sqlite3.Database(path.join(__dirname, '..', 'database.sqlite'));

foodRouter.get('/', (req, res, next) => {
    db.all(`SELECT * FROM Foods`, (err, rows) => {
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
    db.run(`INSERT INTO Foods (name, amount, units, kcal) VALUES(?, ?, ?, ?)`, [food.name, food.amount, food.units, food.kcal], function (err){
        if (err){
            return next(err);
        }

        db.get(`SELECT * FROM Foods WHERE id = ?`, [this.lastID], (err, row) => {
            if (err){
                return next(err);
            }

            return res.status(201).json(row);
        })
    })
})

foodRouter.put('/:foodId', (req, res, next) => {
    const food = req.body
    db.run(`UPDATE Foods SET name = ?, amount = ?, units = ?, kcal = ? WHERE id = ?`, [
        food.name, 
        food.amount, 
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

            return res.status(201).json(row);
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