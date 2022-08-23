const express = require('express')
const router = express.Router()
const authCheck = require('../middlewares/authCheck')
const ctrl = require('../controllers/bookings')

router.get('/:booking_id', authCheck(['admin', 'user']), ctrl.getBookingById)
router.get('/', authCheck(['admin', 'user']), ctrl.getAllBookings)
router.post('/', authCheck(['admin', 'user']), ctrl.addBooking)
router.put('/:booking_id', authCheck(['admin', 'user']), ctrl.updateBooking)
router.delete('/:booking_id', authCheck(['admin', 'user']), ctrl.deleteBooking)

module.exports = router
