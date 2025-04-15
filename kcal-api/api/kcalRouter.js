import express from 'express';
import { pool } from '../db.js';  // Updated for MySQL
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const kcalRouter = express.Router();

kcalRouter.get('/', async (req, res, next) => {
    try {
        // Get the kcal log associated with the given date
        if (req.query.date) {
            const [[row]] = await pool.query(`SELECT * FROM Kcal_Logs WHERE date = ?`, [req.query.date]);
            return res.status(200).json({Log: row});
        }

        // Get average kcal between the given dates
        if (req.query.getAvg) {
            const [row] = await pool.query(`SELECT avg(kcal) as average_kcal FROM Kcal_Logs WHERE date BETWEEN ? AND ?`, [req.query.start, req.query.end]);
            return res.status(200).json({Kcal: row});
        }

        // Get all kcal logs between the given dates 
        if (req.query.start && req.query.end) {
            const [rows] = await pool.query(`SELECT * FROM Kcal_Logs WHERE date BETWEEN ? AND ? ORDER BY date`, [req.query.start, req.query.end]);
            return res.status(200).json({Logs: rows});
        }

        // Get all kcal logs
        const [rows] = await pool.query(`SELECT * FROM Kcal_Logs`);
        return res.status(200).json({Logs: rows});
    } catch (err) {
        next(err);
    }
});

kcalRouter.param('logId', async (req, res, next, id) => {
    try {
        const [[row]] = await pool.query(`SELECT * FROM Kcal_Logs WHERE id = ?`, [id]);

        if (!row) {
            return res.status(404).send(`Log not found with id: ${id}`);
        }

        req.kcalLog = row;
        next();
    } catch (err) {
        next(err);
    }
});

kcalRouter.get('/:logId', (req, res, next) => {
    res.status(200).json({Log: req.kcalLog});
});

kcalRouter.post('/', async (req, res, next) => {
    const log = req.body;
    try {
        const [result] = await pool.query(`INSERT INTO Kcal_Logs (kcal, date) VALUES(?, ?)`, [log.kcal, log.date]);
        const [[row]] = await pool.query(`SELECT * FROM Kcal_Logs WHERE id = ?`, [result.insertId]);
        res.status(201).json({Log: row});
    } catch (err) {
        next(err);
    }
});

kcalRouter.put('/:logId', async (req, res, next) => {
    const log = req.body;
    try {
        await pool.query(`UPDATE Kcal_Logs SET kcal = ? WHERE id = ?`, [log.kcal, req.params.logId]);
        const [[row]] = await pool.query(`SELECT * FROM Kcal_Logs WHERE id = ?`, [req.params.logId]);
        res.status(200).json({Log: row});
    } catch (err) {
        next(err);
    }
});

kcalRouter.delete('/:logId', async (req, res, next) => {
    try {
        await pool.query(`DELETE FROM Kcal_Logs WHERE id = ?`, [req.params.logId]);
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

export default kcalRouter;
