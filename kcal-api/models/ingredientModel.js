import { pool } from "../db/index.js"

export const selectIngredient = async ({recipe_id = null, id = null, orderedBy = "sort_order"} = {}) => {

    const recipeClause = `(recipe_id = ?)`
    const orderClause = ` ORDER BY ${orderedBy}`;

    let result;
    if (Array.isArray(id)){

        // Create a list of placeholders equal to the number of items in id
        const placeholders = id.map(() => "?").join();

        [result] = await pool.query(`SELECT * FROM Ingredients WHERE id IN (${placeholders}) AND ${recipeClause} ${orderClause}`, [id, recipe_id]);
        
    } else if (id !== null) {
        [[result]] = await pool.query(`SELECT * FROM Ingredients WHERE id = ? AND ${recipeClause}`, [id, recipe_id]);
        
    } else if (recipe_id !== null) {    
        [result] = await pool.query(`SELECT * FROM Ingredients WHERE ${recipeClause}${orderClause}`, [recipe_id]);

    } else {
        throw Error("Cannot complete query: No recipe_id or id provided")
    }
    
    return result;
}

export const insertIngredient = async (ingredient) => {
    const [result] = await pool.query(`INSERT INTO Ingredients (recipe_id, food_id, name, quantity, units, sort_order, ingredient_group) VALUES (?, ?, ?, ?, ?, ?, ?)`, [
        ingredient.recipe_id,
        ingredient.food_id,
        ingredient.name,
        ingredient.quantity,
        ingredient.units,
        ingredient.sort_order,
        ingredient.ingredient_group
    ]);

    return result
}

export const updateIngredient = async (ingredient, id) => {
    const [result] = await pool.query(`UPDATE Ingredients SET recipe_id = ?, food_id = ?, name = ?, quantity = ?, units = ?, sort_order = ?, ingredient_group = ? WHERE id = ?`, [
        ingredient.recipe_id,
        ingredient.food_id,
        ingredient.name,
        ingredient.quantity,
        ingredient.units,
        ingredient.sort_order,
        ingredient.ingredient_group,
        id
    ]);
    return result;
}

export const deleteIngredients = async ({id = null, recipe_id = null}) => {

    let result;
    if (id !== null){
        [result] = await pool.query(`DELETE FROM Ingredients WHERE id = ?`, [id]);
    } else if (recipe_id !== null){
        [result] = await pool.query(`DELETE FROM Ingredients WHERE recipe_id = ?`, [recipe_id]);
    } else {
        throw new Error("No id or recipe_id provided");
    }

    return result;
}