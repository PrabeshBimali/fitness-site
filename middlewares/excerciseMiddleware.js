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
        console.log(excercise)
        next()
    }catch(e){
        console.log(e.message)
        res.status(500).json("Server error")
    }
}