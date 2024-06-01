const express = require('express')
const userController = require('../controller/UserController')
const userRouter = express.Router()

userRouter.post('/register', userController.registerUser)
userRouter.post('/register/verifyOtp', userController.verifyOtp)

module.exports = userRouter
