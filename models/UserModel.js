import db from "../config/db.js"

export const test = async function() {
    try{
        let val = await db.query("select Now()");
        console.log(val)
    }
    catch(e) {
        console.log(e.message)
    }
}