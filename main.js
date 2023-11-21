import express from "express"
const app = express()
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { validateLogin, validateRegister, verifyAuth } from "./middlewares/authMiddleware.js"
import { login_post, logout_get, register_post } from "./controllers/authController.js"
import { getUsername, passProfileData, validateProfile, verifyProfileCreated, verifyProfileNotCreated } from "./middlewares/profileMiddleware.js"
import { profile_post } from "./controllers/profileController.js"
import { allExcercisesTransfer, excerciseDetailTransfer } from "./middlewares/excerciseMiddleware.js"
dotenv.config()
const port = process.env.PORT

app.use(express.static("public"));
app.use(express.json())
app.use(cookieParser())
app.set("view engine", "ejs");


app.get("/", verifyAuth, verifyProfileCreated, getUsername, (req, res) => {
  return res.render('pages/dashboard', {username: req.user.username});
})

app.get("/excercise", verifyAuth, verifyProfileCreated, getUsername, (req, res) => {
  return res.render('pages/excercise', {username: req.user.username});
})

app.get("/excercise/start", verifyAuth, verifyProfileCreated, getUsername, allExcercisesTransfer, (req, res) => {
  return res.render("pages/todayexcercises", {username: req.user.username, excercises: req.excercises});
})

app.get("/excercise/:exid", verifyAuth, verifyProfileCreated, getUsername, excerciseDetailTransfer, (req, res) => {
  return res.render('pages/excerciseinstruction', {username: req.user.username, excercise: req.excercise});
})

app.get("/profile/create", verifyAuth, verifyProfileNotCreated, (req, res) => {
  return res.render('pages/createProfile')
})

app.post("/profile", verifyAuth, verifyProfileNotCreated, validateProfile, profile_post)

app.get("/profile", verifyAuth, verifyProfileCreated, getUsername, passProfileData, (req, res) => {
  return res.render('pages/profile', {username: req.user.username, profile: req.profile});
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
// app.get("/test", async (req, res) => {
//   const data = await db.query("SELECT * FROM pg_catalog.pg_tables")
//   console.log(data)
//   return
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})