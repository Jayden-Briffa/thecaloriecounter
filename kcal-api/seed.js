const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
    // Insert sample Foods
    const foodStmt = db.prepare("INSERT INTO Foods (name, quantity, units, added_by, kcal) VALUES (?, ?, ?, ?, ?)");
    const foods = [
        ['Almonds', 100, 'grams', 'api', 641],
        ['Apple', 100, 'grams', 'api', 51],
        ['Apricot', 100, 'grams', 'api', 42],
        ['Bacon streaky', 100, 'grams', 'api', 212],
        ['Banana', 100, 'grams', 'api', 89],
        ['Basil', 100, 'grams', 'api', 23],
        ['Bean salad', 1, 'half can', 'api', 139],
        ['Beef mince 10% fat', 100, 'grams', 'api', 175],
        ['Beef mince 20% fat', 100, 'grams', 'api', 250],
        ['Beef mince 5% fat', 100, 'grams', 'api', 170],
        ['Beetroot', 100, 'grams', 'api', 63],
        ['Blueberries', 100, 'grams', 'api', 58],
        ['Breadstick', 1, '', 'api', 25],
        ['Broccoli', 100, 'grams', 'api', 34],
        ['Butter', 100, 'grams', 'api', 717],
        ['Butter beans', 1, 'half can', 'api', 123],
        ['Carrot raw', 100, 'grams', 'api', 40],
        ['Cauliflower boiled', 100, 'grams', 'api', 29],
        ['Celery', 100, 'grams', 'api', 14],
        ['Cheese', 100, 'grams', 'api', 416],
        ['Cheesecake', 100, 'grams', 'api', 321],
        ['Chicken breast cooked', 100, 'grams', 'api', 165],
        ['Chicken thigh cooked', 100, 'grams', 'api', 176],
        ['Chocolate milk', 100, 'grams', 'api', 600],
        ['Chocolate white', 100, 'grams', 'api', 540],
        ['Coconut', 100, 'grams', 'api', 354],
        ['Corn baby', 100, 'grams', 'api', 28],
        ['Couscous', 100, 'grams', 'api', 376],
        ['Crisps', 100, 'grams', 'api', 519],
        ['Cucumber raw', 100, 'grams', 'api', 14],
        ['Duck fat', 100, 'grams', 'api', 900],
        ['Egg med.', 1, '', 'api', 63],
        ['Fat chicken', 100, 'grams', 'api', 900],
        ['Fish fingers', 3, '', 'api', 163],
        ['Flour white', 100, 'grams', 'api', 364],
        ['Golden syrup', 100, 'grams', 'api', 348],
        ['Grapes', 100, 'grams', 'api', 73],
        ['Green beans cooked', 100, 'grams', 'api', 26],
        ['Ham', 100, 'grams', 'api', 177],
        ['Honey', 100, 'grams', 'api', 304],
        ['Hummus', 1, 'tsp', 'api', 9],
        ['Ketchup', 100, 'grams', 'api', 97],
        ['Kiwi', 100, 'grams', 'api', 60],
        ['Leek', 100, 'grams', 'api', 32],
        ['Lettuce', 100, 'grams', 'api', 14],
        ['Mackeral tin spring water', 1, 'tin', 'api', 176],
        ['Mayo hellman\'s light', 100, 'grams', 'api', 269],
        ['Mayonnaise', 1, 'tbsp', 'api', 90],
        ['Milk', 100, 'grams', 'api', 46],
        ['Milk oat', 100, 'grams', 'api', 59],
        ['Milk skimmed', 100, 'grams', 'api', 35],
        ['Milk whole', 100, 'grams', 'api', 63],
        ['Mini sausages', 5, '', 'api', 89],
        ['Mushroom', 100, 'grams', 'api', 22],
        ['Nectarine', 100, 'grams', 'api', 43],
        ['Nuts pine', 100, 'grams', 'api', 697],
        ['Nuts wal', 100, 'grams', 'api', 701],
        ['Oats', 100, 'grams', 'api', 379],
        ['Oil olive', 1, 'tbsp', 'api', 119],
        ['Oil sesame', 1, 'tbsp', 'api', 120],
        ['Oil vegetable', 1, 'tbsp', 'api', 124],
        ['Oil vegetable', 100, 'grams', 'api', 886],
        ['Olive', 100, 'grams', 'api', 130],
        ['Onion', 100, 'grams', 'api', 40],
        ['Orange', 100, 'grams', 'api', 45],
        ['Pasta cooked', 100, 'grams', 'api', 158],
        ['Pasta raw', 100, 'grams', 'api', 371],
        ['Peach', 100, 'grams', 'api', 33],
        ['Peach', 100, 'grams', 'api', 39],
        ['Peanut butter smooth', 15, 'grams', 'api', 95],
        ['Peas frozen', 100, 'grams', 'api', 81],
        ['Peas snap', 100, 'grams', 'api', 34],
        ['Pepper red', 100, 'grams', 'api', 31],
        ['Pineapple tinned', 1/2, 'can', 'api', 108],
        ['Plum', 100, 'grams', 'api', 46],
        ['Potato boiled', 100, 'grams', 'api', 72],
        ['Potato raw', 100, 'grams', 'api', 77],
        ['Potato roasted', 100, 'grams', 'api', 149],
        ['Rice cooked', 100, 'grams', 'api', 120],
        ['Rice raw', 100, 'grams', 'api', 350],
        ['Sausages', 2, '', 'api', 189],
        ['Scallion', 100, 'grams', 'api', 32],
        ['Seafood cocktail', 47, 'grams', 'api', 88],
        ['Seeds chia', 100, 'grams', 'api', 450],
        ['Seeds pumpkin', 100, 'grams', 'api', 541],
        ['Seeds sunflower', 100, 'grams', 'api', 576],
        ['Spam', 100, 'grams', 'api', 292],
        ['Squash butternut', 100, 'grams', 'api', 45],
        ['Sugar brown', 100, 'grams', 'api', 380],
        ['Sugar white', 100, 'grams', 'api', 378],
        ['Sultanas', 100, 'grams', 'api', 299],
        ['Sweet potato', 100, 'grams', 'api', 86],
        ['Sweetcorn', 1, 'tin', 'api', 208],
        ['Sweetcorn', 100, 'grams', 'api', 86],
        ['Syrup golden', 100, 'grams', 'api', 348],
        ['Tangerine', 100, 'grams', 'api', 53],
        ['Tofu', 100, 'grams', 'api', 145],
        ['Tomato passata', 100, 'grams', 'api', 28],
        ['Tomato raw', 100, 'grams', 'api', 19],
        ['Tomato tinned', 100, 'grams', 'api', 32],
        ['Tomato tinned whole', 100, 'grams', 'api', 25],
        ['Nuts peanuts', 100, 'grams', 'api', 645],
        ['Mustard', 100, 'grams', 'api', 192],
        ['Cabbage', 100, 'grams', 'api', 24]
    ];

    foods.forEach(food => foodStmt.run(food));
    foodStmt.finalize();

    // Insert sample Consumed_Foods
    /* const consumedStmt = db.prepare("INSERT INTO Consumed_Foods (food_id, quantity, kcal, date_consumed) VALUES (?, ?, ?, date('now'))");
    const consumedFoods = [
        [1, 90, 55],  // 90g Apple
        [5, 200, 46],   // 200ml Milk
        [2, 150, 168],  // 150g Chicken Breast
        [4, 100, 89]  // 100g Banana
    ];

    consumedFoods.forEach(food => consumedStmt.run(food));
    consumedStmt.finalize(); */

    db.close();
});