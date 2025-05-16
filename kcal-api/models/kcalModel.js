import { pool } from "../db.js";

export const selectKcal = async ({ userId = null, id = null, date = null, start = null, end = null, getAvg = false} = {}) => {

    let selector = "*";
    let whereClause = '';
    let values = [];
    let expectSingleRow = false;

    // Aggregate?
    if (getAvg){
        selector = "AVG(kcal) AS average_kcal";
        expectSingleRow = true;
    }

    // Filter?
    if (id !== null) {
        whereClause += "WHERE id = ?";
        values = values.concat([id]);
        expectSingleRow = true;

    } else if (date) {
        whereClause += "WHERE user_id = ? AND date = ?";
        values = values.concat([userId, date]);
        expectSingleRow = true;

    } else if (start && end) {
        whereClause += "WHERE user_id = ? AND date BETWEEN ? AND ?";
        values = values.concat([userId, start, end]);

    }
    
    let [rows] = await pool.query(`SELECT ${selector} FROM Kcal_Logs ${whereClause}`, values);

    if (expectSingleRow){
        [rows] = rows
    }
 
    return rows

};

export const insertKcal = async (log) => {
    const [result] = await pool.query(`INSERT INTO Kcal_Logs (kcal, user_id, date) VALUES(?, ?, ?)`, [log.kcal, log.userId, log.date]);
    return result;
};

export const updateKcal = async (log, id) => {
    const [result] = await pool.query(`UPDATE Kcal_Logs SET kcal = ? WHERE id = ?`, [log.kcal, id]);
    return result;
};

export const deleteKcal = async ({id = null, userId = null}) => {

    let result;
    if (id !== null){
        [result] = await pool.query(`DELETE FROM Kcal_Logs WHERE id = ?`, [id]);
    } else if (userId !== null){
        [result] = await pool.query(`DELETE FROM Kcal_Logs WHERE user_id = ?`, [userId]);
    } else {
        throw new Error("No id or userId provided");
    }
    
    return result;
};