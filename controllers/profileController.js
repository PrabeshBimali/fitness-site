import { create, update } from "../models/ProfileModel.js"

export async function profile_post(req, res) {
    try {

        const profile = await create(req)
        return res.status(200).json(profile)

    }catch(e) {
        console.log("Error when posting profile", e.message)
        res.status(500).json("server error")
    }
}

export async function profile_put(req, res) {
    try{
        await update(req)
        return res.status(200).json("updated")
    }catch(e) {
        console.log("Error when updating profile: ", e.message)
        res.status(500).json("server error")
    }
}