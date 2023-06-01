const express = require('express')
const taskRouter = require('./taskRoutes')
const router = express.Router()
const userRouter = require('./userRoutes')

router.use('/user', userRouter)
router.use('/task', taskRouter)

module.exports = router
