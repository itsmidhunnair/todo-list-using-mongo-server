const {
  createTask,
  fetchTask,
  changeStatus,
  removeTask,
} = require('../services/taskServices')

/**
 * Will Add Task
 */
const addTask = async (req, res) => {
  const { name, desc } = req.body
  try {
    const data = await createTask(req.email, name, desc)
    res.status(201).json(data)
  } catch (error) {
    res.status(400).send('Task Adding Failed')
  }
}

/**
 * To Get all Task
 */
const getTask = async (req, res) => {
  try {
    const data = await fetchTask(req.email)
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json(error)
  }
}

/**
 * To Update Task Status
 */
const updateStatus = async (req, res) => {
  const status = req.body
  const id = req.params
  console.log('>>>>>>>>>>>>>>>>>>>', status, id)
  try {
    const data = await changeStatus(req.email, id, status)
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json(error)
  }
}

/**
 * To Delete Tasl
 */
const deleteTask = async (req, res) => {
  const id = req.params
  try {
    const { acknowledged, modifiedCount } = await removeTask(req.email, id)
    if (acknowledged && modifiedCount === 1) {
      return res.status(200).send('Product Deleted Successfully')
    }
    return res.status(400).json('Product Delete Failed')
  } catch (error) {
    res.status(400).json(error)
  }
}

module.exports = { addTask, getTask, deleteTask, updateStatus }
