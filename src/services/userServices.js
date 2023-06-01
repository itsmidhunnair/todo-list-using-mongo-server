const userSchema = require('../model/userSchema')

/**
 * To Create a user document in MongoDB
 * @param {string} fname
 * @param {string} lname
 * @param {string} email
 * @param {string} username
 * @param {string} password
 * @param {date} dob
 * @param {male} gender
 * @returns
 */
const createUser = async (
  fname,
  lname,
  email,
  username,
  password,
  dob,
  gender
) => {
  const data = new userSchema({
    fname: fname,
    lname: lname,
    email: email,
    username: username,
    password: password,
    dob: dob,
    gender: gender,
  })

  try {
    const saveData = await data.save()
    return saveData
  } catch (error) {
    if (error.code === 11000 && error.keyPattern.email) {
      throw 'User Already Exist Please Login'
    }
    throw error
  }
}

/**
 * To Fetch Users Details based on email
 * @param {*} email
 * @returns All Details of User if Found
 */
const getUserPass = async (email) => {
  try {
    const data = await userSchema.findOne({ email: email }).select('password')
    if (data === null) {
      throw 'User Not Found'
    } else {
      return data
    }
  } catch (error) {
    throw error
  }
}

/**
 * To verify if a email is present in DB or Not
 *
 */
const validateEmail = async (email) => {
  try {
    const data = await userSchema.findOne({ email: email }).select('email role')
    if (data === null) {
      throw 'User Not Found'
    } else {
      return data
    }
  } catch (error) {
    throw error
  }
}

const getUserDetails = async (email) => {
  try {
    const data = await userSchema.findOne({ email: email }).select('-password')
    if (data === null) {
      throw 'User Not Found'
    } else {
      return data
    }
  } catch (error) {
    throw error
  }
}

module.exports = { createUser, getUserPass, validateEmail, getUserDetails }
