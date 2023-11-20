import express from "express"
const app = express()
import dotenv from "dotenv"
import { validateRegister } from "./middlewares/authMiddleware.js"
import { register_post } from "./controllers/authController.js"
dotenv.config()
const port = process.env.PORT

app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    return res.render('pages/index');
})

app.get("/register", (req, res) => {
  return res.render('pages/register');
})

app.post("/register", validateRegister, register_post)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})