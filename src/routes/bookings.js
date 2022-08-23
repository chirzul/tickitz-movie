const express = require('express')
const router = express.Router()
const authCheck = require('../middlewares/authCheck')
const ctrl = require('../controllers/bookings')

router.get('/:booking_id', authCheck, ctrl.getBookingById)
router.get('/', authCheck, ctrl.getAllBookings)
router.post('/', authCheck, ctrl.addBooking)
router.put('/:booking_id', authCheck, ctrl.updateBooking)
router.delete('/:booking_id', authCheck, ctrl.deleteBooking)

module.exports = router
