import { pool } from "../db.js"

export const selectFood = async ({userId = null, id = null, orderedBy = null} = {}) => {

    const orderClause = orderedBy ? ` ORDER BY ${orderedBy}` : ' ';

    let result;
    if (Array.isArray(id)){

        // Create a list of placeholders equal to the number of items in id
        const placeholders = id.map(() => "?").join();

        [result] = await pool.query(`SELECT * FROM Foods WHERE id IN (${placeholders})${orderClause}`, [id]);
        
    } else if (id !== null) {
        [[result]] = await pool.query(`SELECT * FROM Foods WHERE id = ?`, [id]);
        
    } else if (userId !== null) {    
        [result] = await pool.query(`SELECT * FROM Foods WHERE user_id = ? OR user_id = -1${orderClause}`, [userId]);

    } else {
        throw Error("Cannot complete query: No userId or id provided")
    }
    
    return result;
}

export const insertFood = async (food) => {
    const [result] = await pool.query(`INSERT INTO Foods (name, quantity, units, user_id, kcal) VALUES (?, ?, ?, ?, ?)`, [
        food.name,
        food.quantity,
        food.units,
        food.userId,
        food.kcal
    ]);

    return result
}

export const updateFood = async (food, id) => {
    const [result] = await pool.query(`UPDATE Foods SET name = ?, quantity = ?, units = ?, kcal = ? WHERE id = ?`, [
        food.name,
        food.quantity,
        food.units,
        food.kcal,
        id
    ]);
    return result;
}

export const deleteFood = async ({id = null, userId = null}) => {

    let result;
    if (id !== null){
        [result] = await pool.query(`DELETE FROM Foods WHERE id = ?`, [id]);
    } else if (userId !== null){
        [result] = await pool.query(`DELETE FROM Foods WHERE user_id = ?`, [userId]);
    } else {
        throw new Error("No id or userId provided");
    }

    return result;
}