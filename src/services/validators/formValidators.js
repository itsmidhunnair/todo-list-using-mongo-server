const Joi = require('joi')

/**
 * Function to validate the received inputs of Signup Form
 *
 * @param {string} fname
 * @param {string} lname
 * @param {string} email
 * @param {string} password
 * @param {string} username
 * @param {date} dob
 * @param {string} gender
 * @returns Boolean - "True" if all the input fields are valid
 *
 */
function signupValidate(fname, lname, email, password, username, dob, gender) {
  let currDate = new Date()
  const maxDate = new Date().setFullYear(currDate.getFullYear() - 5)
  console.log(' ------------------- Initails', dob)

  dob = new Date(dob)
  console.log('------------------ Before', dob)

  const schema = Joi.object({
    fname: Joi.string()
      .regex(/[a-zA-Z]$/)
      .required(),

    lname: Joi.string()
      .regex(/[a-zA-Z]$/)
      .required(),

    email: Joi.string()
      .regex(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
      .required(),

    username: Joi.string()
      .regex(/[a-z0-9]$/)
      .required(),

    password: Joi.string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .required(),

    dob: Joi.date().max(maxDate).required(),

    gender: Joi.string().required(),
  })

  try {
    const result = schema.validate({
      fname,
      lname,
      email,
      password,
      username,
      dob,
      gender
    })
    if (result.error) {
      console.log(result.error)
      return false
    }
    return true
  } catch (err) {
    console.log('Form Validator Error', err)
  }
}

/**
 * Function to validate the received inputs of Login Form
 *
 * @param Email - Email Field of Login Form Request
 * @param Password - Password Field of Login Form Request
 * @returns Boolean - "True" if all the input fields are valid
 *
 */
function loginValidate(email, password) {
  const schema = Joi.object({
    email: Joi.string()
      .regex(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      )
      .required(),

    password: Joi.string()
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .required(),
  })

  try {
    const result = schema.validate(email, password)
    if (result.error) {
      return false
    }
    return true
  } catch (err) {
    console.log('Form Validator Error', err)
  }
}

module.exports = { signupValidate, loginValidate }
