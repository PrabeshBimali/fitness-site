import * as history from "../models/HistoryModel.js"

export async function sleep_put(req, res) {
    try{
        const {date, hrsSlept} = req.body

        req.body.hrsSlept = parseInt(hrsSlept)

        const userid = req.userid
        let historyData = await history.findByUseridAndDate(userid, date)

        if(historyData) {
            await history.updateSleepHours(historyData.historyid, req.body.hrsSlept)
        }else{
            await history.create(userid, date)
            historyData = await history.findByUseridAndDate(userid, date)
            await history.updateSleepHours(historyData.historyid, req.body.hrsSlept)
        }   

        historyData = await history.findByUseridAndDate(userid, date)

        res.status(200).json(historyData)

    }catch(e){
        console.log("Error when adding calories consumed: ", e.message)
        res.status(500).json("Server error")
    }
}