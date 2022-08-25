require('dotenv').config()
const express = require('express')
const cors = require('cors')
const main = require('./src/main')
const app = express()
const db = require('./src/config/db')

const init = async () => {
  try {
    await db.connect()
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    const whitelist = [`http://localhost:${process.env.APP_PORT}`]
    const corsOptionsDelegate = function (req, callback) {
      let corsOptions
      if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
      } else {
        corsOptions = { origin: false }
      }
      callback(null, corsOptions)
    }

    app.use('/api/v1', cors(corsOptionsDelegate), main)

    app.listen(process.env.APP_PORT, () => {
      console.log(
        `CORS-enabled Tickitz Movie App listening on port ${process.env.APP_PORT}`
      )
    })
  } catch (error) {
    console.log(error)
  }
}

init()
