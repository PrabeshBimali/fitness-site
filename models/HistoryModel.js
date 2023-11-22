import db from "../config/db.js"

export async function findByUseridAndDate(userid, date) {
    const query = `SELECT * from dailyhistory where userid=$1 and historydate = $2`
    const answer = await db.query(query, [userid, date])

    if(answer.rowCount > 0){
        return answer.rows[0]
    }

    return ""
}

export async function updateCaloriesBurned(historyid, prevcalories, caloriesToAdd) {
    const burnedCalories = prevcalories + caloriesToAdd
    const query = `UPDATE dailyhistory set caloriesburned = $1 where historyid = $2`

    await db.query(query, [burnedCalories, historyid])
}

export async function updateCaloriesConsumed(historyid, newCaloriesValue) {
    const query = `UPDATE dailyhistory set calorieconsumed = $1 where historyid = $2`

    await db.query(query, [newCaloriesValue, historyid])
}

export async function updateWaterConsumed(historyid, newWaterValue) {
    const query = `UPDATE dailyhistory set waterintake = $1 where historyid = $2`

    await db.query(query, [newWaterValue, historyid])
}

export async function create(userid, date) {
    const query = `Insert into dailyhistory(userid, historydate) values($1, $2)`

    await db.query(query, [userid, date])
}