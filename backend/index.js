const express = require("express")
const app = express()
const cors= require('cors')
const mongoose = require("mongoose")
const router = require("./router")
require('dotenv').config()

const port = 3001 || process.env.PORT

app.use(cors({
    origin: "*"
}))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

router(app)

const URL = process.env.MONGODB

const connectDB = async() =>{
    try {
        await mongoose.connect(
            URL,
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
        console.log("Connected to MongoDB");

    } catch (error) {
        console.log(error);
        process.exit(1)
    }
} 

connectDB()

app.use((error, req, res, next) => {
    const message = error.message || "Something went wrong"
    return res.json({
        success: false,
        message: message
    })
})


app.listen(port, () => {
    console.log('server is running on port', port);
})