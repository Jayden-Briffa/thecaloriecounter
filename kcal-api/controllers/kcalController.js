import * as model from '../models/kcalModel.js';

export const paramLogId = async (req, res, next, id) => {
    try {
        const row = await model.selectKcal({id});

        if (!row) {
            return res.status(404).send(`Log not found with id: ${id}`);
        }

        req.kcalLog = row;

         if (req.foodItem.user_id !== res.locals.user.id){
            return res.status(403).json({errors: {forbidden: "You cannot affect kcal logs that aren't yours"}})
        }

        next();
    } catch (err) {
        next(err);
    }
};

export const getKcal = async (req, res, next) => {
    try {

        // Get all kcal logs
        const rows = await model.selectKcal({userId: res.locals.user.id, ...req.query});

        if (req.query.getAvg){
            return res.status(200).json({Kcal: rows.average_kcal});
        }

        return res.status(200).json({Logs: rows});

    } catch (err) {
        next(err);
    }
};

export const getKcalLogId = (req, res, next) => {
    res.status(200).json({Log: req.kcalLog});
};

export const postKcal = async (req, res, next) => {
    const log = req.body;
    log.userId = res.locals.user.id;

    try {
        const result = await model.insertKcal(log);
        const row = await model.selectKcal({id: result.insertId});
        res.status(201).json({Log: row});
    } catch (err) {
        next(err);
    }
};

export const putKcalLogId = async (req, res, next) => {
    const log = req.body;
    const id = req.params.logId
    try {
        await model.updateKcal(log, id);
        const row = await model.selectKcal({id});
        res.status(200).json({Log: row});
    } catch (err) {
        next(err);
    }
};

export const deleteKcalLogId = async (req, res, next) => {
    try {
        await model.deleteKcal({id: req.params.logId});
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};