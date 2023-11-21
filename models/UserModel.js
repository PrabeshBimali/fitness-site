import db from "../config/db.js"
import bcrypt from "bcrypt"

export const create = async function(req) {
 
    const { username, password, email } = req.body;
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const query = `Insert into users (username, password, email) values ($1, $2, $3)`

    await db.query(query, [username, hashedPassword, email])
    const answer = await db.query(`Select userid from users where username = $1`, [username])

    return answer.rows[0]
}

export const findUserByEmail = async function(email) {
    
    const query = `Select * from users where email = $1`

    const answer = await db.query(query, [email])

    if(answer.rowCount > 0) {
        return answer.rows[0]
    }
    
    return ""
}

export const findUserById = async function(id) {
    const query = `Select * from users where userid = $1`

    const answer = await db.query(query, [id])

    if(answer.rowCount > 0) {
        return answer.rows[0]
    }
    
    return ""
}

export const setProfileGeneratedToTrue = async function(id) {
    const query = `Update users set profilegenerated = true where userid=$1`

    await db.query(query, [id])
}