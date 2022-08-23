const ctrl = {}
const model = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const response = require('../helpers/response')

const generateToken = async (username, role) => {
  try {
    const payload = {
      username,
      role
    }

    const token = jwt.sign(payload, process.env.JWT_KEYS, { expiresIn: '90m' })

    const result = {
      msg: 'token created',
      token
    }
    return result
  } catch (error) {
    return error
  }
}

ctrl.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await model.getUser(username)

    if (user.length === 0) {
      return response(res, 401, 'user tidak terdaftar', true)
    }

    const role = await user[0].role
    const check = await bcrypt.compare(password, user[0].password)

    if (!check) {
      return response(res, 401, 'password salah', true)
    }

    const result = await generateToken(username, role)
    return response(res, 200, result)
  } catch (error) {
    return response(res, 500, 'Terjadi kesalahan', true)
  }
}

module.exports = ctrl
