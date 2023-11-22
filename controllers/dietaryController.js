import * as history from "../models/HistoryModel.js"

export async function calorie_put(req, res) {
    try{
        const {date, caloriesConsumed} = req.body

        req.body.caloriesConsumed = parseInt(caloriesConsumed)

        const userid = req.userid
        let historyData = await history.findByUseridAndDate(userid, date)

        if(historyData) {
            const newCalories = historyData.calorieconsumed + req.body.caloriesConsumed
            await history.updateCaloriesConsumed(historyData.historyid, newCalories)
        }else{
            await history.create(userid, date)
            historyData = await history.findByUseridAndDate(userid, date)
            const newCalories = historyData.calorieconsumed + req.body.caloriesConsumed
            await history.updateCaloriesConsumed(historyData.historyid, newCalories)
        }   

        historyData = await history.findByUseridAndDate(userid, date)

        res.status(200).json(historyData)

    }catch(e){
        console.log("Error when adding calories consumed: ", e.message)
        res.status(500).json("Server error")
    }
}

export async function water_put(req, res) {
    try{
        const {date, waterConsumed} = req.body

        req.body.waterConsumed = parseInt(waterConsumed)

        const userid = req.userid
        let historyData = await history.findByUseridAndDate(userid, date)

        if(historyData) {
            const newWater = historyData.waterintake + req.body.waterConsumed
            await history.updateWaterConsumed(historyData.historyid, newWater)
        }else{
            await history.create(userid, date)
            historyData = await history.findByUseridAndDate(userid, date)
            const newWater = historyData.waterintake + req.body.waterConsumed
            await history.updateCaloriesConsumed(historyData.historyid, newWater)
        }   

        historyData = await history.findByUseridAndDate(userid, date)

        res.status(200).json(historyData)

    }catch(e){
        console.log("Error when adding calories consumed: ", e.message)
        res.status(500).json("Server error")
    }
}

export async function history_get(req, res) {
    try {
        const {date} = req.query
        const userid = req.userid
        let historyData = await history.findByUseridAndDate(userid, date)
        res.status(200).json(historyData)

    }catch(e){
        console.log("Error when getting history data: ", e.messaage)
        res.status(500).json("Server error")
    }
}