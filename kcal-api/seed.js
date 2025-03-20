const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    // Insert sample Foods
    const foodStmt = db.prepare("INSERT INTO Foods (name, quantity, units, added_by, kcal) VALUES (?, ?, ?, ?, ?)");
    const foods = [
        ['Apple', 100, 'grams', 'api', 62],
        ['Chicken Breast, raw', 100, 'grams','api', 112],
        ['Brown Rice', 100, 'grams', 'api', 330],
        ['Banana', 100, 'grams', 'api', 89],
        ['Milk, semi-skimmed', 100, 'ml', 'api', 46]
    ];

    foods.forEach(food => foodStmt.run(food));
    foodStmt.finalize();

    // Insert sample Consumed_Foods
    const consumedStmt = db.prepare("INSERT INTO Consumed_Foods (food_id, quantity, kcal, date_consumed) VALUES (?, ?, ?, date('now'))");
    const consumedFoods = [
        [1, 90, 55],  // 90g Apple
        [5, 200, 46],   // 200ml Milk
        [2, 150, 168],  // 150g Chicken Breast
        [4, 100, 89]  // 100g Banana
    ];

    consumedFoods.forEach(food => consumedStmt.run(food));
    consumedStmt.finalize();

    db.close();
});