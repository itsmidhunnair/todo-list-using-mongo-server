const express = require('express')
const taskRouter = require('./taskRoutes')
const router = express.Router()
const userRouter = require('./userRoutes')

router.get('/', (req, res)=>res.send('<h1>Todo List Server Online!</h1>'))
router.use('/user', userRouter)
router.use('/task', taskRouter)

module.exports = router
