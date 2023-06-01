const mongoose = require('mongoose')

async function mongoConnect() {
  const mongoUrl = process.env.DATABASE_URL
  try {
    await mongoose.connect(mongoUrl)
    console.log('MonogoDB Connected to Successfully')
  } catch (error) {
    console.log(error)
  }
}

module.exports = { mongoConnect }
