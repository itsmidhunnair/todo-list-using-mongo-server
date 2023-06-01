const jwt = require('jsonwebtoken')
const { encodeToken } = require('../services/jwtServices')
const { verifyPassword, hashPassword } = require('../services/passwordHandling')
const {
  createUser,
  validateEmail,
  getUserDetails,
} = require('../services/userServices')
const { signupValidate } = require('../services/validators/formValidators')

/**
 * To Register User
 */
const signupUser = async (req, res) => {
  const { fname, lname, email, username, dob, gender } = req.body
  let { password, role } = req.body
  try {
    const isValid = signupValidate(
      fname,
      lname,
      email,
      password,
      username,
      dob,
      gender
    )
    if (!isValid) {
      return res.status(400).send('Invalid Form Fields')
    }
    password = await hashPassword(password)
    const data = await createUser(
      fname,
      lname,
      email,
      username,
      password,
      dob,
      gender
    )
    console.log(data)
    res.status(201).send('User Added Successfully')
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

/**
 * To Get a Users Data based on email
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const isValidated = await verifyPassword(email, password)
    console.log(isValidated)
    if (!isValidated) {
      return res.status(401).send('Invalid Credentials')
    }
    const token = encodeToken(isValidated)
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })

    return res.status(200).send(isValidated)
  } catch (error) {
    console.log(error)
    res.status(401).json('Invalid Credentials')
  }
}

/**
 * To Check if a decode mail from token is present in DB or Not
 */
const verifyUser = async (req, res) => {
  const email = req.email
  try {
    const validate = await validateEmail(email)
    res.status(200).json(validate)
  } catch (error) {
    res.status(400).json(error)
  }
}

const getUser = async (req, res) => {
  const email = req.email
  try {
    const data = await getUserDetails(email)
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json(error)
  }
}

/**
 * for getting User Data
 */
const logoutUser = async (req, res) => {
  // res.clearCookie('token')
  res.cookie('token', '', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    expire: -3600,
  })
  res.set('Cache-Control', 'no-store')
  res.status(200).send('User logged out Successfully')
}

module.exports = { signupUser, loginUser, verifyUser, logoutUser, getUser }
