import * as users from "../models/UserModel.js"

export async function getUsername(req, res, next) {
    try{
        const user = await users.findUserById(req.userid)
        req.user = { username: user.username }
        next()
    }catch(e){
        console.log("Error when getting username", e.message)
        return res.status(500).json("server error")
    }
}