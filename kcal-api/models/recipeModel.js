import { pool } from "../db/db.js";

export const selectRecipe = async ({ userId = null, id = null, orderedBy = null } = {}) => {
    const orderClause = orderedBy ? ` ORDER BY ${orderedBy}` : "";
    const usersCondition = "(user_id = ? OR user_id = -1)"

    let result;
    if (Array.isArray(id)) {
        const placeholders = id.map(() => "?").join(", ");

        [result] = await pool.query(
            `SELECT * FROM Recipes WHERE ${usersCondition} AND id IN (${placeholders})${orderClause}`,
            [userId, ...id]
        );
    } else if (id !== null) {
        [[result]] = await pool.query(
            `SELECT * FROM Recipes WHERE ${usersCondition} AND id = ?`,
            [userId, id]
        );
    } else if (userId !== null) {
        [result] = await pool.query(
            `SELECT * FROM Recipes WHERE ${usersCondition}${orderClause}`,
            [userId]
        );
    } else {
        throw Error("Cannot complete query: No userId or id provided");
    }

    return result;
};

export const insertRecipe = async (recipe) => {
    const [result] = await pool.query(
        `INSERT INTO Recipes (
            user_id,
            name,
            instructions,
            makes_quantity,
            measure_quantity,
            units
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
            recipe.userId,
            recipe.name,
            recipe.instructions,
            recipe.makesQuantity,
            recipe.measureQuantity,
            recipe.units
        ]
    );

    return result;
};

export const updateRecipe = async (recipe, id) => {
    const [result] = await pool.query(
        `UPDATE Recipes
         SET
            name = ?,
            instructions = ?,
            makes_quantity = ?,
            measure_quantity = ?,
            units = ?
         WHERE id = ?`,
        [
            recipe.name,
            recipe.instructions,
            recipe.makesQuantity,
            recipe.measureQuantity,
            recipe.units,
            id
        ]
    );

    return result;
};

export const deleteRecipe = async ({ id = null, userId = null }) => {
    let result;

    if (id !== null) {
        [result] = await pool.query(
            `DELETE FROM Recipes WHERE id = ?`,
            [id]
        );
    } else if (userId !== null) {
        [result] = await pool.query(
            `DELETE FROM Recipes WHERE user_id = ?`,
            [userId]
        );
    } else {
        throw new Error("No id or userId provided");
    }

    return result;
};
