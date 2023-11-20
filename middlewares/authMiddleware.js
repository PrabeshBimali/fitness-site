import dotenv from "dotenv"
import Jwt from "jsonwebtoken"
dotenv.config()

function validateUsername(username) {

    if(!username) {
        return "This field is required"
    }

    let regexPattern = /^[a-zA-Z0-9]+$/

    if(username.length < 3) {
        return "Username should be 3 chracters or more"
    }

    if(username.length > 50) {
        return "Username should be less than 50 characters or less"
    }

    if(!regexPattern.test(username)) {
        return "Only numbers and alphabets are allowed"
    }

    return ""
}

function validateEmail(email) {

    if(!email) {
        return "This field is required"
    }

    let regexPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if(!regexPattern.test(email)) {
        return "Enter valid email"
    }

    if(email.length > 320) {
        return "Email length invalid"
    }

    return ""
}

function validatePassword(password) {

    if(!password) {
        return "This field is required"
    }

    if(password.length < 8) {
        return "Length must be 8 characters long"
    }

    return ""
}

function validateAge(age) {
    if(age < 13) {
        return "Age must be 13 years"
    }

    if(age > 130) {
        return "Invalid age"
    }

    return ""
}

export function validateRegister(req, res, next) {
    console.log(req.body)
    let {username, email, password, age} = req.body;

    const errors = {username: "", email: "", password: "", age: ""}
    age = parseInt(age)

    const usernameError = validateUsername(username)
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)
    const ageError = validateAge(age)

    if(!usernameError && !emailError && !passwordError && !ageError) {
        
        req.body.age = age
        req.body.username = username.toLowerCase();
        req.body.email = email.toLowerCase();
        next()

    }else{

        errors.username = usernameError
        errors.email = emailError
        errors.password = passwordError
        errors.age = ageError

        return res.status(400).json(errors)
    }
}


export function validateLogin(req, res, next) {
    let {email, password} = req.body;

    const errors = {email: "", password: ""}

    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    if(!emailError && !passwordError) {

        req.body.email = email.toLowerCase();
        next()

    }else{

        errors.email = emailError
        errors.password = passwordError

        return res.status(400).json(errors)
    }
}

export async function verifyAuth(req, res, next) {
    const token = req.cookies.jwt

    if(token) {
        Jwt.verify(token,  process.env.JWT_SECRET, (err, decodedjwt) => {
            if (err) {
                console.log(err.message)
                res.redirect("/login")
            }else {
                req.userid = decodedjwt.id
                next()
            }
        })
    }else {
        res.redirect("/login")
    }
}