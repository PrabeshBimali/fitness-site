import express from "express"
import db from "./config/db.js"
const app = express()
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { validateLogin, validateRegister, verifyAuth } from "./middlewares/authMiddleware.js"
import { login_post, logout_get, register_post } from "./controllers/authController.js"
import { getUsername } from "./middlewares/profileMiddleware.js"
dotenv.config()
const port = process.env.PORT

app.use(express.static("./public"));
app.use(express.json())
app.use(cookieParser())
app.set("view engine", "ejs");


app.get("/", verifyAuth, getUsername, (req, res) => {
  console.log(req.user)
  return res.render('pages/dashboard', {username: req.user.username});
})

app.get("/excercise", verifyAuth, getUsername, (req, res) => {
  return res.render('pages/excercise', {username: req.user.username});
})

app.get("/register", (req, res) => {
  return res.render('pages/register');
})

app.post("/register", validateRegister, register_post)

app.get("/login", (req, res) => {
  return res.render('pages/login')
})

app.post("/login", validateLogin, login_post)

app.get("/logout", logout_get)

app.get("/test", async (req, res) => {
  const data = await db.query("SELECT * FROM pg_catalog.pg_tables")
  console.log(data)
  return
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})