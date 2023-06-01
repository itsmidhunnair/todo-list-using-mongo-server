const { decodeToken } = require('../services/jwtServices')

/**
 * Middleware to check if the received token is valid or not
 *
 *  @returns next() - Calls next Function if the received token is valid else returns (401)
 *
 */
const authUser = (req, res, next) => {
  if (req.headers.cookie) {
    const token = req.headers.cookie.split('=')[1]
    try {
      const { email, role } = decodeToken(token)
      req.email = email
      req.role = role
      next()
    } catch (err) {
      console.log(err.message)
      res.status(401).json('Unauthorized User')
    }
  } else {
    res.status(401).json('Unauthorized User')
  }
}

const isAdmin = (req, res, next) => {
  if (req.role === 1) {
    next()
  } else {
    res.status(401).json('Unauthorized Access')
  }
}

module.exports = { authUser, isAdmin }
