const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fname: {
    required: true,
    type: String,
  },
  lname: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  dob: {
    required: true,
    type: Date,
  },
  gender: {
    required: true,
    type: String,
  },
})

module.exports = mongoose.model('User', userSchema)
