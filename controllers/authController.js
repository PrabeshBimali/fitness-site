import * as users from "../models/UserModel.js"
import Jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config()

const maxAge = 60 * 60 * 24 * 3

function createToken(id) {
    return Jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
}

export async function register_post(req, res) {
    try {

        const {userid, username} = await users.create(req)
        const token = createToken(userid)
        res.cookie("jwt", token, {maxAge: maxAge * 1000})
        res.cookie("username", username, {maxAge: maxAge * 1000})
        return res.status(200).json(userid)

    }catch (e) {
        console.log(e)
        const errors = {username: "", email: "", password: "", age: ""}

        if(e.code = 23505) {
            if(e.constraint === 'username_unique'){
                errors.username = "Username should be unique"
            }

            if(e.constraint === 'email_unique'){
                errors.email = "Email should be unique"
            }

            return res.status(400).json(errors)
        }

        return res.status(500).json("Server Error on register")
    }
}

export async function login_post(req, res) {
    try {
        const {email, password} = req.body
        const errors = { email: "", password: "" }
        const user = await users.findUserByEmail(email)

        if(user) {
            const auth = await bcrypt.compare(password, user.password)

            if(auth) {
                const token = createToken(user.userid)
                res.cookie("jwt", token, {maxAge: maxAge * 1000})
                res.cookie("username", user.username, {maxAge: maxAge * 1000})
                return res.status(200).json(user.userid)
            }
            else {
                errors.password = "Email and password does not match"
                return res.status(400).json(errors)
            }
        }

        errors.email = "Email does not match"
        return res.status(400).json(errors)
    }
    catch(e) {
        console.log(e)
        return res.status(500).json("server error")
    }
}

export function logout_get(req, res) {
    res.cookie('jwt', '', {maxAge: 1})
    return res.redirect("/login")
}