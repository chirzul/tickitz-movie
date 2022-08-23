const express = require('express')
const router = express.Router()
const movies = require('./routes/movies')
const schedules = require('./routes/schedules')
const bookings = require('./routes/bookings')
const users = require('./routes/users')
const auth = require('./routes/auth')

router.use('/movies', movies)
router.use('/schedules', schedules)
router.use('/bookings', bookings)
router.use('/users', users)
router.use('/auth', auth)

module.exports = router
