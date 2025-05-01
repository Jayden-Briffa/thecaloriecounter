import { pool } from "../db.js"

export const selectConsumed = async (id = null) => {
    
    let rows;

    if (id !== null) {
        [[rows]] = await pool.query(`SELECT * FROM Consumed_Foods WHERE id = ?`, [id]);
    } else {
        [rows] = await pool.query(`SELECT * FROM Consumed_Foods`);
    }
    
    return rows 
}

export const insertConsumed = async (food) => {
    const [result] = await pool.query(`INSERT INTO Consumed_Foods (food_id, quantity, kcal, date_consumed) VALUES(?, ?, ?, ?)`, [
        food.foodId, 
        food.quantity, 
        food.kcal,
        food.dateConsumed
    ]);

    return result
}

export const updateConsumed = async (food) => {
    const [result] = await pool.query(`UPDATE Consumed_Foods SET quantity = ?, kcal = ? WHERE id = ?`, [
        food.quantity,
        food.kcal,
        req.consumedFood.id
    ]);

    return result
}

export const deleteConsumed = async (id) => {
    
    if (typeof id === Object){
        const placeholders = consumedIdsArr.map(() => "?").join();
        whereClause = `WHERE id IN (${placeholders})`;

        await pool.query(`DELETE FROM Consumed_Foods WHERE is IN (${placeholders})`, id)
    } else {
        await pool.query(`DELETE FROM Consumed_Foods WHERE id = ?`, [id])
    }
    
}