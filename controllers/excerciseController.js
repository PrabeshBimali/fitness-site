import * as ex from "../models/ExcerciseModel.js"
import * as history from "../models/HistoryModel.js"

export async function excercisehistory_post(req, res) {
    try{
        req.body.exid = parseInt(req.body.exid)
        req.body.calorieBurnt = parseFloat(req.body.calorieBurnt)
        req.body.time = parseFloat(req.body.time)

        console.log(req.body)

        const {date, time, exid, calorieBurnt} = req.body
        const userid = req.userid
        let historyData = await history.findByUseridAndDate(userid, date)

        if(historyData) {
            await history.updateCaloriesBurned(historyData.historyid, historyData.caloriesburned, calorieBurnt)
        }else{
            await history.create(userid, date)
            historyData = await history.findByUseridAndDate(userid, date)
            await history.updateCaloriesBurned(historyData.historyid, historyData.caloriesburned, calorieBurnt)
        }

        await ex.createExcerciseHistory(userid, exid, historyData.historyid, calorieBurnt, time, date, historyData.tempreps)

        res.status(200).json("Excercise tracked!")

    }catch(e){
        console.log(e.message)
        res.status(500).json("server error")
    }
}

export async function store_tempreps(req, res) {
    try {
        const {date} = req.body
        const userid = req.userid
        const tempreps = parseInt(req.body.reps)
        await history.updateTempReps(userid, date, tempreps)

        res.status(200).json("Updated")

    }catch(e){
        console.log("Error when storing temp reps: ", e.messaage)
        res.status(500).json("Server error")
    }
}