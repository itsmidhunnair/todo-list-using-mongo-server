const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
    ref: 'User',
  },
  todos: [
    {
      name: {
        required: true,
        type: String,
      },
      description: {
        required: true,
        type: String,
      },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
})

module.exports = mongoose.model('Task', taskSchema)
