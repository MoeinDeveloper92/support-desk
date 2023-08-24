const express = require("express")
const dotenv = require("dotenv").config()
const PORT = process.env.PORT || 5000
const userRoute = require("./routes/userRoutes")
const { errorHandler } = require("./middleware/errorMiddleware")
const app = express()

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the support ticket system"
    })
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Ruoutes
app.use("/api/users", userRoute)
app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`The server is running on the port ${PORT}`)
})