const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    // Insert sample Foods
    const foodStmt = db.prepare("INSERT INTO Foods (name, amount, units, kcal) VALUES (?, ?, ?, ?)");
    const foods = [
        ['Apple', 1, 'medium', 62],
        ['Chicken Breast', 150, 'grams', 260],
        ['Brown Rice', 100, 'grams', 330],
        ['Banana', 1, 'large', 150]
    ];

    foods.forEach(food => foodStmt.run(food));
    foodStmt.finalize();

    // Insert sample Consumed_Foods
    const consumedStmt = db.prepare("INSERT INTO Consumed_Foods (food_id, amount, date_consumed) VALUES (?, ?, date('now'))");
    const consumedFoods = [
        [1, 1],  // 1 Apple
        [2, 150],  // 150g Chicken Breast
        [3, 100],  // 100g Brown Rice
        [4, 1]   // 1 Banana
    ];

    consumedFoods.forEach(food => consumedStmt.run(food));
    consumedStmt.finalize();

    db.close();
});