const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const { mongoConnect } = require('./src/config/mongo.config')
const router = require('./src/routes')

dotenv.config()
const app = express()

const port = process.env.SERVER_PORT

// These Cors Config is must for HTTP only
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())

mongoConnect()

app.use('/', router)

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`)
})
