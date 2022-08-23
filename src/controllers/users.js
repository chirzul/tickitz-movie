const ctrl = {}
const model = require('../models/users')
const hash = require('../helpers/hash')
const response = require('../helpers/response')

ctrl.addUser = async (req, res) => {
  try {
    const user = await model.getUser(req.body.username)
    const checkEmail = await model.checkEmail(req.body.email)

    if (user.length > 0) {
      return response(res, 400, 'Username sudah terdaftar', true)
    }

    if (checkEmail.length > 0) {
      return response(res, 400, 'Email sudah terdaftar', true)
    }

    const hashPassword = await hash(req.body.password)
    const data = await model.addUser({ ...req.body, hashPassword })
    return response(res, 201, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.getUserInfo = async (req, res) => {
  try {
    const data = await model.getUserInfo(req.decode)
    return response(res, 200, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.updateUser = async (req, res) => {
  try {
    const data = await model.updateUser({ ...req.decode, ...req.body })
    return response(res, 200, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.changePassword = async (req, res) => {
  try {
    const hashPassword = await hash(req.body.password)
    const data = await model.changePassword({ ...req.decode, hashPassword })
    return response(res, 200, data)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

ctrl.deleteUser = async (req, res) => {
  try {
    if (req.decode.role === 'admin') {
      const data = await model.deleteUser(req.params)
      return response(res, 200, data)
    } else {
      return response(res, 401, 'Anda tidak memiliki akses', true)
    }
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

module.exports = ctrl
