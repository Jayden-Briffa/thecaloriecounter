// Create some foods for this user and one of another user
export default async function createDummyFoods(pool, foodsPerId){
    let foodIds = {}

    // Create numFoods foods associated with userId for each key: valuse pair in foodsPerId
    for (const [userId, numFoods] of Object.entries(foodsPerId)){
        foodIds[userId] = []    
        
        for (let i=0; i<numFoods; i++){
            const [results] = await pool.query("INSERT INTO foods (user_id, name, quantity, units, kcal) VALUES (?, ?, ?, ?, ?)", 
                [userId, `Banana #${i}`, 100, "grams", 89],
            )
            foodIds[userId].push(results.insertId)
        }
    }

    return foodIds
}