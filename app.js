require('dotenv').config()
const express = require('express')
const main = require('./src/main')
const app = express()
const db = require('./src/config/db')

const init = async () => {
  try {
    await db.connect()
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use('/uploads', express.static('uploads'))
    app.use('/api/v1', main)

    app.listen(process.env.APP_PORT, () => {
      console.log(`Tickitz Movie App listening on port ${process.env.APP_PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

init()
