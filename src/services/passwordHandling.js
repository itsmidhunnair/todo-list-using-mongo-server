const bcrypt = require('bcrypt')
const { getUserPass } = require('./userServices')

/**
 * To HASH PASSWORD
 * @param password - Normal Text password that is to be hashed
 * @returns Hash - Encrypted (hashed) Value
 */
async function hashPassword(password) {
  return await bcrypt.hash(password, 10).then((hash) => hash)
}

/**
 * To verify HASH PASSWORD
 * @param email - email received from the client
 * @param password - Normal Text password received from the client
 * @returns {Object} - 'Email & Password' if the email passed is present in DB and Password matches ELSE returns 'false'
 */
async function verifyPassword(email, password) {
  try {
    const hashNrole = await getUserPass(email)
    const hash = hashNrole.password
    console.log(hash)
    console.log('hash', hash)
    const isMatch = await bcrypt.compare(password, hash)
    if (isMatch) {
      return { email }
    } else {
      return isMatch
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
}
