const express = require("express")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config({path: './env/.env'})

const userRouter = require("./routes/user")

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use((req, res, next) => {
    console.log("L'application est en cours...")
    next()
})

app.use("/auth", userRouter)

app.use((req, res) => {
    res.status(404).json({message: "Route Introuvable !!! "})
})

module.exports = app