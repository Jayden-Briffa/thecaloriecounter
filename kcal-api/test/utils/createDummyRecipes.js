// Create some recipes for this user and one of another user
export default async function createDummyRecipes(pool, recipesPerId){
    let recipeIds = {}

    // Create numRecipes recipes associated with userId for each key: valuse pair in recipesPerId
    for (const [userId, numRecipes] of Object.entries(recipesPerId)){
        recipeIds[userId] = []    
        for (let i=0; i<numRecipes; i++){
            const [results] = await pool.query("INSERT INTO recipes (user_id, name, instructions, measure_quantity, makes_quantity) VALUES (?, ?, ?, ?, ?)", 
                [userId, `Crumble #${i}`, 'Instructs for crumble', 1, 8],
            )
            recipeIds[userId].push(results.insertId)
        }
    }

    return recipeIds
}