import db from "../config/db.js"

export async function findByUseridAndDate(userid, date) {
    const query = `SELECT * from dailyhistory where userid=$1 and historydate = $2`
    const answer = await db.query(query, [userid, date])

    if(answer.rowCount > 0){
        return answer
    }

    return ""
}

export async function updateCaloriesBurned(historyid, prevcalories, caloriesToAdd) {
    const burnedCalories = prevcalories + caloriesToAdd
    const query = `UPDATE dailyhistory set caloriesburned = $1 where historyid = $2`

    const val = await db.query(query, [burnedCalories, historyid])
    console.log(val)
}

export async function create(userid, date) {
    const query = `Insert into dailyhistory(userid, historydate) values($1, $2)`

    await db.query(query, [userid, date])
}