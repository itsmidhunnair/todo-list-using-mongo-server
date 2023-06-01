const express = require('express')
const {
  addTask,
  getTask,
  updateStatus,
  deleteTask,
} = require('../controller/taskController')
const { authUser } = require('../middleware/authUser')
const taskRouter = express.Router()

taskRouter.use('/', authUser)
taskRouter.post('/add', addTask)
taskRouter.get('/get', getTask)
taskRouter.put('/status/:id', updateStatus)
taskRouter.delete('/delete/:id', deleteTask)

module.exports = taskRouter
