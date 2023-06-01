const express = require('express')
const {
  signupUser,
  loginUser,
  verifyUser,
  logoutUser,
  getUser,
} = require('../controller/userController')
const { authUser } = require('../middleware/authUser')
const userRouter = express.Router()

userRouter.post('/signup', signupUser)
userRouter.post('/login', loginUser)

// Adds Auth Middleware to all the underlying calls
userRouter.use('/', authUser)

//verify token -- returns the decoded email
userRouter.get('/verify', verifyUser)

userRouter.get('/getuser', getUser)

userRouter.get('/logout', logoutUser)

module.exports = userRouter
