// Create some ingredients for this user and one of another user
export default async function createDummyIngredients(pool, ingredientsPerId){
    let ingredientIds = {}

    // Create numIngredients ingredients associated with ingredientId for each key: value pair in ingredientsPerId
    for (const [recipeId, numIngredients] of Object.entries(ingredientsPerId)){
        ingredientIds[recipeId] = []    
        for (let i=0; i<numIngredients; i++){
            const [results] = await pool.query("INSERT INTO ingredients (recipe_id, name, quantity, ingredient_group) VALUES (?, ?, ?, ?)", 
                [recipeId, `Filling ingredient #${i}`, 100, "filling"],
            )
            ingredientIds[recipeId].push(results.insertId)
        }
    }

    return ingredientIds
}