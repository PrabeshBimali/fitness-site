import { findByUserId } from "../models/ProfileModel.js"
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

async function profileExists(userid) {
    const user = await users.findUserById(userid)
    const isProfile = user.profilegenerated

    return isProfile
}

export async function verifyProfileCreated(req, res, next) {
    try{
        const isProfile = await profileExists(req.userid)

        if(isProfile) {
            next()
        }else {
            res.redirect("/profile/create")
        }
    }catch(e){
        console.log("Error when verify created verification", e.message)
        return res.status(500).json("server error")
    }
}

export async function verifyProfileNotCreated(req, res, next) {
    try{
        const isProfile = await profileExists(req.userid)

        if(!isProfile) {
            next()
        }else {
            res.redirect("/")
        }
    }catch(e){
        console.log("Error when verify created verification", e.message)
        return res.status(500).json("server error")
    }
}

export async function validateProfile(req, res, next) {
    const { age, height, inches, weight, gender, calorieLimit, calorieBurnGoal, waterGoal, sleepGoal, sleepTime } = req.body

    req.body.age = Math.trunc(parseFloat(age))
    req.body.height = Math.trunc(parseFloat(height))
    req.body.inches = Math.trunc(parseFloat(inches))
    req.body.weight = Math.trunc(parseFloat(weight))
    req.body.gender = gender.toLowerCase()

    if(calorieLimit){
        console.log("WTF")
        req.body.calorieLimit = Math.round(parseFloat(calorieLimit))
    }else{
        req.body.calorieLimit = null
    }
    
    if(calorieBurnGoal){
        req.body.calorieBurnGoal = Math.round(parseFloat(calorieBurnGoal))
    }else{
        req.body.calorieBurnGoal = null
    }

    if(waterGoal){
        req.body.waterGoal = Math.round(parseFloat(waterGoal) * 10)/10
    }else{
        req.body.waterGoal = null
    }
    
    if(sleepGoal){
        req.body.sleepGoal = Math.trunc(parseFloat(sleepGoal))
    }else{
        req.body.sleepGoal = null
    }

    if(!sleepTime){
        req.body.sleepTime = null
    }

    next()
}

export async function passProfileData(req, res, next) {
    try{
        const profile = await findByUserId(req.userid)
        req.profile = profile
        next()

    }catch(e) {
        console.log(e.message)
        res.status(500).server("Server error")
    }
}