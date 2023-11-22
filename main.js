import express from "express"
const app = express()
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { validateLogin, validateRegister, verifyAuth } from "./middlewares/authMiddleware.js"
import { login_post, logout_get, register_post } from "./controllers/authController.js"
import { getUsername, passProfileData, validateProfile, verifyProfileCreated, verifyProfileNotCreated } from "./middlewares/profileMiddleware.js"
import { profile_post, profile_put } from "./controllers/profileController.js"
import { allExcercisesTransfer, excerciseDetailTransfer, transferExcerciseHistoryForTodayDate } from "./middlewares/excerciseMiddleware.js"
import { excercisehistory_post, get_excerciseHistoryForGivenDate, store_tempreps } from "./controllers/excerciseController.js"
import { quote_get } from "./controllers/quoteController.js"
import { calorie_put, history_get, water_put } from "./controllers/dietaryController.js"
import { sleep_put } from "./controllers/sleepController.js"
dotenv.config()
const port = process.env.PORT

app.use(express.static("public"));
app.use(express.json())
app.use(cookieParser())
app.set("view engine", "ejs");


app.get("/", verifyAuth, verifyProfileCreated, getUsername, passProfileData, (req, res) => {
  return res.render('pages/dashboard', {username: req.user.username, profile: req.profile});
})

app.get("/excercise", verifyAuth, verifyProfileCreated, getUsername, passProfileData, (req, res) => {
  return res.render('pages/excercise', {username: req.user.username, profile: req.profile});
})

app.get("/excercise/start", verifyAuth, verifyProfileCreated, getUsername, allExcercisesTransfer, transferExcerciseHistoryForTodayDate, (req, res) => {
  return res.render("pages/todayexcercises", {username: req.user.username, excercises: req.excercises, excerciseHistory: req.excerciseHistory});
})

app.get("/excercise/:exid", verifyAuth, verifyProfileCreated, getUsername, excerciseDetailTransfer, passProfileData, (req, res) => {
  return res.render('pages/excerciseinstruction', {username: req.user.username, excercise: req.excercise, profile: req.profile});
})

app.post("/excercisehistory", verifyAuth, verifyProfileCreated, excercisehistory_post)

app.post("/excercisehistory/tempreps", verifyAuth, verifyProfileCreated, store_tempreps)

app.get("/excercisehistory/date", verifyAuth, verifyProfileCreated, get_excerciseHistoryForGivenDate)

app.get("/profile/create", verifyAuth, verifyProfileNotCreated, (req, res) => {
  return res.render('pages/createProfile')
})

app.get("/profile/update", verifyAuth, verifyProfileCreated, passProfileData, (req, res) => {
  return res.render('pages/updateProfile', {profile: req.profile})
})

app.post("/profile", verifyAuth, verifyProfileNotCreated, validateProfile, profile_post)

app.put("/profile", verifyAuth, verifyProfileCreated, validateProfile, profile_put)

app.get("/profile", verifyAuth, verifyProfileCreated, getUsername, passProfileData, (req, res) => {
  return res.render('pages/profile', {username: req.user.username, profile: req.profile});
})

app.get("/dietary", verifyAuth, verifyProfileCreated, getUsername, passProfileData, (req, res) => {
  return res.render('pages/dietary', {username: req.user.username, profile: req.profile});
})

app.put("/dietary/calorie", verifyAuth, verifyProfileCreated, calorie_put)

app.put("/dietary/water", verifyAuth, verifyProfileCreated, water_put)

app.get("/sleep", verifyAuth, verifyProfileCreated, getUsername, passProfileData, (req, res) => {
  return res.render('pages/sleep', {username: req.user.username, profile: req.profile});
})

app.put("/sleep", verifyAuth, verifyProfileCreated, sleep_put)

app.get("/history/single", verifyAuth, verifyProfileCreated, history_get)

app.get("/quote", quote_get)

app.get("/register", (req, res) => {
  return res.render('pages/register');
})

app.post("/register", validateRegister, register_post)

app.get("/login", (req, res) => {
  return res.render('pages/login')
})

app.post("/login", validateLogin, login_post)

app.get("/logout", logout_get)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})