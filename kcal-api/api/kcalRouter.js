const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const kcalRouter = express.Router();
const db = new sqlite3.Database(path.join(__dirname, '..', 'database.sqlite'));


kcalRouter.get('/', (req, res, next) => {

    // Get the kcal log associated with the given date
    if (req.query.date){
        return db.get(`SELECT * FROM Kcal_Logs WHERE date = ?`, [req.query.date], (err, row) => {
            if (err){
                return next(err);
            }

            return res.status(200).json({Log: row})
        })

        // Get average kcal between the given dates
    } else if (req.query.getAvg){
        return db.get(`SELECT avg(kcal) as average_kcal FROM Kcal_Logs WHERE date BETWEEN ? AND ?`, [req.query.start, req.query.end], (err, row) => {
            if (err){ 
                return next(err);
            }

            return res.status(200).json({Kcal: row})
        })

        // Get all kcal logs between the given dates 
    } else if (req.query.start && req.query.end){

        return db.all(`SELECT * FROM Kcal_Logs WHERE date BETWEEN ? AND ? ORDER BY date`, [req.query.start, req.query.end], (err, rows) => {
            if (err){
                return next(err);
            };

            return res.status(200).json({Logs : rows})
        });
    }

    // Get all kcal logs
    return db.all(`SELECT * FROM Kcal_Logs`, (err, rows) => {
        if (err){
            return next(err);
        };

        return res.status(200).json({Logs : rows})
});

})

kcalRouter.param('logId', (req, res, next) => {
    const id = req.params.logId
    db.get(`SELECT * FROM Kcal_Logs WHERE id = ?`, [id], (err, row) => {
        if (err){
            return next(err);
        }

        if (!row){
            return res.status(404).send(`Food not found with id: ${id}`);
        }

        req.kcalLog = row;
        return next();
    });
})

kcalRouter.get('/:logId', (req, res, next) => {
    return res.status(200).json({Log: req.kcalLog});
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

            return res.status(201).json({Log: row});
        })
    })
})

kcalRouter.put('/:logId', (req, res, next) => {
    const log = req.body
    db.run(`UPDATE Kcal_Logs SET kcal = ? WHERE id = ?`, [
        log.kcal, 
        req.params.logId
    ], 
        function (err){
        if (err){
            return next(err);
        }

        db.get(`SELECT * FROM Kcal_Logs WHERE id = ?`, [req.params.logId], (err, row) => {
            if (err){
                return next(err);
            }

            return res.status(201).json({Log: row});
        })
    })
})

kcalRouter.delete('/:logId', (req, res, next) => {
    db.run(`DELETE FROM Kcal_Logs WHERE id = ?`, [req.params.logId], (err) => {
        if (err){
            return next(err);
        }

        return res.status(204).send();
    })
})

module.exports = kcalRouter;