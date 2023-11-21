import { create } from "../models/ProfileModel.js"

export async function profile_post(req, res) {
    try {

        const profile = await create(req)
        return res.status(200).json(profile)

    }catch(e) {
        console.log("Error when posting profile", e.message)
        res.status(500).json("server error")
    }
}