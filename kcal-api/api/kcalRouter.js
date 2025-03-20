const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const kcalRouter = express.Router();
const db = new sqlite3.Database(path.join(__dirname, '..', 'database.sqlite'));

// Get all kcal logs
kcalRouter.get('/', (req, res, next) => {
    db.all(`SELECT * FROM Kcal_Logs`, (err, rows) => {
        if (err){
            return next(err);
        };

        return res.status(200).json({Kcals : rows})
    });
})

// Get all kcal logs between the specified dates 
kcalRouter.get('/', (req, res, next) => {
    
    db.all(`SELECT * FROM Kcal_Logs WHERE date BETWEEN ? AND ?`, [req.query.start, req.query.end], (err, rows) => {
        if (err){
            return next(err);
        };

        return res.status(200).json({Kcals : rows})
    });
})

kcalRouter.param('kcalId', (req, res, next) => {
    const id = req.params.kcalId
    db.get(`SELECT * FROM Kcal_Logs WHERE id = ?`, [id], (err, row) => {
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

kcalRouter.get('/:kcalId', (req, res, next) => {
    return res.status(200).json(req.foodItem);
})

kcalRouter.post('/', (req, res, next) => {
    const log = req.body
    db.run(`INSERT INTO Kcal_Logs (kcal, date) VALUES(?, ?)`, [log.kcal, log.date], function (err){
        if (err){
            return next(err);
        }

        db.get(`SELECT * FROM Kcal_Logs WHERE id = ?`, [this.lastID], (err, row) => {
            if (err){
                return next(err);
            }

            return res.status(201).json({Kcals: row});
        })
    })
})

kcalRouter.put('/:kcalId', (req, res, next) => {
    const log = req.body
    db.run(`UPDATE Kcal_Logs SET kcal = ?, date = ?`, [
        log.kcal, 
        log.date, 
        req.params.kcalId
    ], 
        function (err){
        if (err){
            return next(err);
        }

        db.get(`SELECT * FROM Kcal_Logs WHERE id = ?`, [req.params.kcalId], (err, row) => {
            if (err){
                return next(err);
            }

            return res.status(201).json({Kcals: row});
        })
    })
})

kcalRouter.delete('/:kcalId', (req, res, next) => {
    db.run(`DELETE FROM Kcal_Logs WHERE id = ?`, [req.params.kcalId], (err) => {
        if (err){
            return next(err);
        }

        return res.status(204).send();
    })
})

module.exports = kcalRouter;