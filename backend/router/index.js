const userRouter = require("./UserRouter")

const router = (app) => {
    app.use('/v1/user', userRouter)
}

module.exports = router
