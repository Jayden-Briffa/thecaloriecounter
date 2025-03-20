const sqlite3 = require('sqlite3');
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

db.serialize(() => {
    db.run("DROP TABLE IF EXISTS Foods");
    db.run(`CREATE TABLE Foods (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        name TEXT NOT NULL,
        quantity FLOAT NOT NULL,
        units TEXT NOT NULL,
        kcal TEXT NOT NULL,
        added_by TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    db.run("DROP TABLE IF EXISTS Consumed_Foods");
    db.run(`CREATE TABLE Consumed_Foods (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        food_id INT NOT NULL,
        quantity FLOAT NOT NULL,
        kcal INT NOT NULL,
        date_consumed TEXT NOT NULL,
        FOREIGN KEY (food_id) REFERENCES Foods(id)
    )`);

    db.run("DROP TABLE IF EXISTS Kcal_Logs");
    db.run(`CREATE TABLE Kcal_Logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        kcal INT NOT NULL,
        date TEXT NOT NULL
    )`);
})