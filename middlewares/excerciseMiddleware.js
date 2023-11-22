import * as ex from "../models/ExcerciseModel.js"

export async function allExcercisesTransfer(req, res, next) {
    try {
        const excercises = await ex.getAllExcercises();
        req.excercises = excercises
        next()
    }catch(e){
        console.log(e.message)
        res.status(500).json("Server error")
    }
}

export async function excerciseDetailTransfer(req, res, next) {
    try {
        const excercise = await ex.findExcerciseById(req.params.exid);
        req.excercise = excercise
        next()
    }catch(e){
        console.log(e.message)
        res.status(500).json("Server error")
    }
}

export async function validateExcerciseHistoryData(req, res, next) {
    const { time, exid, caloriesBurnt } = req.body;

    req.body.exid = parseInt(exid)
    req.body.caloriesBurnt = parseFloat(caloriesBurnt)
    req.body.time = parseFloat(time)

    next()
}