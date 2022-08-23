const ctrl = {}
const model = require('../models/bookings')
const response = require('../helpers/response')

ctrl.addBooking = async (req, res) => {
  try {
    if (req.decode.role === 'admin') {
      const data = await model.addBooking(req.body)
      return response(res, 201, data)
    } else {
      return response(res, 401, 'Anda tidak memiliki akses', true)
    }
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.getAllBookings = async (req, res) => {
  try {
    const data = await model.getAllBookings()
    return response(res, 200, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.getBookingById = async (req, res) => {
  try {
    const data = await model.getBookingById(req.params)
    return response(res, 200, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.updateBooking = async (req, res) => {
  try {
    if (req.decode.role === 'admin') {
      const data = await model.updateBooking({ ...req.params, ...req.body })
      return response(res, 200, data)
    } else {
      return response(res, 401, 'Anda tidak memiliki akses', true)
    }
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.deleteBooking = async (req, res) => {
  try {
    if (req.decode.role === 'admin') {
      const data = await model.deleteSchedule(req.params)
      return response(res, 200, data)
    } else {
      return response(res, 401, 'Anda tidak memiliki akses', true)
    }
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

module.exports = ctrl
