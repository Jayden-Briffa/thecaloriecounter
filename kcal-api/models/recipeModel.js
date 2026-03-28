import { pool } from "../db/index.js";

export const selectRecipe = async ({ user_id = null, id = null, orderedBy = null } = {}) => {
    const orderClause = orderedBy ? ` ORDER BY ${orderedBy}` : "";
    const usersCondition = "(user_id = ?)"

    let result;
    if (Array.isArray(id)) {
        const placeholders = id.map(() => "?").join(", ");
        [result] = await pool.query(
            `SELECT * FROM Recipes WHERE ${usersCondition} AND id IN (${placeholders})${orderClause}`,
            [user_id, ...id]
        );
    } else if (id !== null) {
        [[result]] = await pool.query(
            `SELECT * FROM Recipes WHERE ${usersCondition} AND id = ?`,
            [user_id, id]
        );
    } else if (user_id !== null) {
        [result] = await pool.query(
            `SELECT * FROM Recipes WHERE ${usersCondition}${orderClause}`,
            [user_id]
        );
    } else {
        throw Error("Cannot complete query: No user_id or id provided");
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
            recipe.user_id,
            recipe.name,
            recipe.instructions,
            recipe.makes_quantity,
            recipe.measure_quantity,
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
            recipe.makes_quantity,
            recipe.measure_quantity,
            recipe.units,
            id
        ]
    );

    return result;
};

export const deleteRecipe = async ({ id = null, user_id = null }) => {
    let result;

    if (id !== null) {
        [result] = await pool.query(
            `DELETE FROM Recipes WHERE id = ?`,
            [id]
        );
    } else if (user_id !== null) {
        [result] = await pool.query(
            `DELETE FROM Recipes WHERE user_id = ?`,
            [user_id]
        );
    } else {
        throw new Error("No id or user_id provided");
    }

    return result;
};
