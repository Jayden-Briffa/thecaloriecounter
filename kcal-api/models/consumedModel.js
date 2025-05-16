import { pool } from "../db.js"

export const selectConsumed = async ({userId = null, id = null} = {}) => {
    
    let rows;
    
    if (id !== null) {
        [[rows]] = await pool.query(`SELECT * FROM Consumed_Foods WHERE id = ?`, [id]);
    } else if (userId !== null) {
        [rows] = await pool.query(`SELECT * FROM Consumed_Foods WHERE user_id = ?`, [userId]);
    } else {
        return null
    }
 
    return rows 
}

export const insertConsumed = async (food) => {
    const [result] = await pool.query(`INSERT INTO Consumed_Foods (food_id, quantity, kcal, user_id, date_consumed) VALUES (?, ?, ?, ?, ?)`, [
        food.foodId, 
        food.quantity, 
        food.kcal,
        food.userId,
        food.dateConsumed
    ]);

    return result
}

export const updateConsumed = async (food, id) => {
    const [result] = await pool.query(`UPDATE Consumed_Foods SET quantity = ?, kcal = ? WHERE id = ?`, [
        food.quantity,
        food.kcal,
        id
    ]);

    return result
}

export const deleteConsumed = async (id) => {
    
    let result;
    if (Array.isArray(id)){
        // Create a list of placeholders equal to the number of items in id
        const placeholders = id.map(() => "?").join();

        [result] = await pool.query(`DELETE FROM Consumed_Foods WHERE id IN (${placeholders})`, id)
    } else {
        [result] = await pool.query(`DELETE FROM Consumed_Foods WHERE id = ?`, [id])
    }

    return result;
}