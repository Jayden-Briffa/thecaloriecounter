import { pool } from "../db.js";
import bcrypt from 'bcrypt';

export async function selectUserById(id) {
    const [[row]] = await pool.query(`SELECT * FROM Users WHERE id = ?`, [id])
    return row ?? []
};

export async function selectUserByEmail(email) {
    const [[row]] = await pool.query(`SELECT * FROM Users WHERE email = ?`, [email])

    return row ?? []
};

export async function insertUser(email, password) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt)

    const [result] = await pool.query(`INSERT INTO Users (email, password) VALUES (?, ?)`, [email, hashPassword])
    return result
};

export async function deleteUser(id) {
    const [result] = await pool.query(`DELETE FROM Users WHERE id = ?`, [id])
    return result
};