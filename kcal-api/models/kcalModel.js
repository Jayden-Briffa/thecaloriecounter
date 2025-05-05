import { pool } from "../db.js";

export const selectKcal = async ({ id = null, date = null, start = null, end = null, getAvg = false} = {}) => {

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
        whereClause = "WHERE id = ?";
        values = [id];
        expectSingleRow = true;

    } else if (date) {
        whereClause = "WHERE 'date' = ?";
        values = [date];
        expectSingleRow = true;

    } else if (start && end) {
        whereClause = "WHERE date BETWEEN ? AND ?";
        values = [start, end];

    }
    
    let [rows] = await pool.query(`SELECT ${selector} FROM Kcal_Logs ${whereClause}`, values);

    if (expectSingleRow){
        [rows] = rows
    }
    
    return rows

};

export const insertKcal = async (log) => {
    const [result] = await pool.query(`INSERT INTO Kcal_Logs (kcal, date) VALUES(?, ?)`, [log.kcal, log.date]);
    return result;
};

export const updateKcal = async (log, id) => {
    const [result] = await pool.query(`UPDATE Kcal_Logs SET kcal = ? WHERE id = ?`, [log.kcal, id]);
    return result;
};

export const deleteKcal = async (id) => {
    const [result] = await pool.query(`DELETE FROM Kcal_Logs WHERE id = ?`, [id]);
    return result;
};