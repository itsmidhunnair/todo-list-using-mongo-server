const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const jwtKey = process.env.JWT_KEY

const encodeToken = ({email,role}) => {
  return jwt.sign({ email: email, role: role }, jwtKey)
}

const decodeToken = (token) => {
  try {
  const decoded = jwt.verify(token, jwtKey)
    return decoded
  } catch (err) {
    console.log(err.message)
    throw err.message
    // res.status(401).json('Unauthorized User')
  }
}

module.exports = { encodeToken, decodeToken }
