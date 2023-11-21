import db from "../config/db.js"

export async function getAllExcercises() {
    const excercises = await db.query('Select id, name, met, link, instructions from excercises')

    return excercises.rows;
}

export async function findExcerciseById(id) {
    const query = `Select id, name, met, link, instructions from excercises where id = $1`

    const ex = await await db.query(query, [id])

    return ex.rows[0]
}