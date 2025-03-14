const sqlite3 = require('sqlite3');
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS Foods");
    db.run(`CREATE TABLE Foods (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        name TEXT NOT NULL,
        amount FLOAT NOT NULL,
        units TEXT NOT NULL,
        kcal TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run("DROP TABLE IF EXISTS Consumed_Foods");
    db.run(`CREATE TABLE Consumed_Foods (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        food_id INT NOT NULL,
        amount FLOAT NOT NULL,
        date_consumed TEXT NOT NULL,
        FOREIGN KEY (food_id) REFERENCES Foods(id)
    )`);
})