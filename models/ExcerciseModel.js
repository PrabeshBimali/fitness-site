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

export async function createExcerciseHistory(userid, exid, historyid, calorieburned, excercisetime, date) {
    const query = `Insert into excerciseHistory(userid, exid, historyid, calorie, excercisetime, todaydate) 
                    values ($1, $2, $3, $4, $5)`

    await db.query(query, [userid, exid, historyid, calorieburned, excercisetime, date])
}