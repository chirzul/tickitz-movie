const ctrl = {}
const model = require('../models/schedules')
const response = require('../helpers/response')

ctrl.addSchedule = async (req, res) => {
  try {
    const data = await model.addSchedule(req.body)
    return response(res, 201, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.getAllSchedules = async (req, res) => {
  try {
    const data = await model.getAllSchedules()
    return response(res, 200, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.getScheduleById = async (req, res) => {
  try {
    const data = await model.getScheduleById(req.params)
    return response(res, 200, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.updateSchedule = async (req, res) => {
  try {
    const data = await model.updateSchedule({ ...req.params, ...req.body })
    return response(res, 200, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.deleteSchedule = async (req, res) => {
  try {
    const data = await model.deleteSchedule(req.params)
    return response(res, 200, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

module.exports = ctrl
