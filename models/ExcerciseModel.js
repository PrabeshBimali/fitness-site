import db from "../config/db.js"

export async function getAllExcercises() {
    const excercises = await db.query('Select id, name, met, link, instructions from excercises')

    return excercises.rows;
}

export async function findExcerciseById(id) {
    const query = `Select id, name, met, link, instructions from excercises where id = $1`

    const ex = await db.query(query, [id])

    return ex.rows[0]
}

export async function findAllHistoryForADateByUserId(userid, date) {
    const query = `select name, excercisetime, calorie, reps from excercises join excercisehistory on excercises.id = excercisehistory.exid and todaydate=$1 and userid=$2`

    const ans = await db.query(query, [date, userid])

    return ans.rows;
}

export async function createExcerciseHistory(userid, exid, historyid, calorieburned, excercisetime, date, reps) {
    const query = `Insert into excerciseHistory(userid, exid, historyid, calorie, excercisetime, todaydate, reps) 
                    values ($1, $2, $3, $4, $5, $6, $7)`

    await db.query(query, [userid, exid, historyid, calorieburned, excercisetime, date, reps])
}