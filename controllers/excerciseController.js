import * as ex from "../models/ExcerciseModel.js"
import * as history from "../models/HistoryModel.js"

export async function excercisehistory_post(req, res) {
    try{
        const {date, time, exid, caloriesBurnt} = req.body
        const userid = req.userid
        const historyData = await history.findByUseridAndDate(userid, date)

        if(historyData) {
            await history.updateCaloriesBurned(historyData.historyid, historyData.caloriesburned, caloriesBurnt)
        }else{
            await history.create(userid, date)
            await history.updateCaloriesBurned(historyData.historyid, historyData.caloriesburned, caloriesBurnt)
        }   

    }catch(e){
        console.log(e.message)
        res.status(500).json("server error")
    }
}