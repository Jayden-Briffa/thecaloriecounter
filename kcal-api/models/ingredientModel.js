import { pool } from "../db/index.js"

export const selectIngredient = async ({recipeId = null, id = null, orderedBy = "sort_order"} = {}) => {

    const orderClause = ` ORDER BY ${orderedBy}`;

    let result;
    if (Array.isArray(id)){

        // Create a list of placeholders equal to the number of items in id
        const placeholders = id.map(() => "?").join();

        [result] = await pool.query(`SELECT * FROM Ingredients WHERE id IN (${placeholders})${orderClause}`, id);
        
    } else if (id !== null) {
        [[result]] = await pool.query(`SELECT * FROM Ingredients WHERE id = ?`, [id]);
        
    } else if (recipeId !== null) {    
        [result] = await pool.query(`SELECT * FROM Ingredients WHERE recipe_id = ?${orderClause}`, [recipeId]);

    } else {
        throw Error("Cannot complete query: No recipeId or id provided")
    }
    
    return result;
}

export const insertIngredient = async (ingredient) => {
    const [result] = await pool.query(`INSERT INTO Ingredients (recipe_id, food_id, name, quantity, units, sort_order, ingredient_group) VALUES (?, ?, ?, ?, ?, ?, ?)`, [
        ingredient.recipeId,
        ingredient.foodId,
        ingredient.name,
        ingredient.quantity,
        ingredient.units,
        ingredient.sortOrder,
        ingredient.ingredientGroup
    ]);

    return result
}

export const updateIngredient = async (ingredient, id) => {
    const [result] = await pool.query(`UPDATE Ingredients SET recipe_id = ?, food_id = ?, name = ?, quantity = ?, units = ?, sort_order = ?, ingredient_group = ? WHERE id = ?`, [
        ingredient.recipeId,
        ingredient.foodId,
        ingredient.name,
        ingredient.quantity,
        ingredient.units,
        ingredient.sortOrder,
        ingredient.ingredientGroup,
        id
    ]);
    return result;
}

export const deleteIngredient = async ({id = null, recipeId = null}) => {

    let result;
    if (id !== null){
        [result] = await pool.query(`DELETE FROM Ingredients WHERE id = ?`, [id]);
    } else if (recipeId !== null){
        [result] = await pool.query(`DELETE FROM Ingredients WHERE recipe_id = ?`, [recipeId]);
    } else {
        throw new Error("No id or recipeId provided");
    }

    return result;
}