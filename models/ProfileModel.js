import db from "../config/db.js"
import { setProfileGeneratedToTrue } from "./UserModel.js"

export async function findByUserId(userid) {

    const profile = await db.query(`Select * from profile where userid = $1`, [userid])

    if(profile.rowCount > 0) {
        return profile.rows[0]
    }

    return ""
}

export async function create(req) {
    const { age, height, inches, weight, gender, calorieLimit, calorieBurnGoal, waterGoal, sleepGoal, sleepTime } = req.body;
    const userid = req.userid;

    const query = `Insert into profile (age, userid, foot, inches, weight, gender, calorielimit, 
                    calorieburngoal, waterintakegoal, sleepgoal, sleeptime) values ($1, $2, $3, $4, 
                    $5, $6, $7, $8, $9, $10, $11)`

    await db.query(query, [age, userid, height, inches, weight, gender, calorieLimit, calorieBurnGoal, waterGoal, sleepGoal, sleepTime])
    await setProfileGeneratedToTrue(userid)
    const answer = await findByUserId(userid)

    return answer
}

export async function update(req) {
    const { age, height, inches, weight, gender, calorieLimit, calorieBurnGoal, waterGoal, sleepGoal, sleepTime } = req.body;
    const userid = req.userid;

    const query = `Update profile set age=$1, foot=$3, inches=$4, weight=$5, gender=$6, 
                    calorielimit=$7, calorieburngoal=$8, waterintakegoal=$9, sleepgoal=$10, sleeptime=$11 where userid=$2`

    await db.query(query, [age, userid, height, inches, weight, gender, calorieLimit, calorieBurnGoal, waterGoal, sleepGoal, sleepTime])

    return 1
}
