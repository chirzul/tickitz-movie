const jwt = require('jsonwebtoken')
const response = require('../helpers/response')

const authCheck = (req, res, next) => {
  const { authtoken } = req.headers

  if (!authtoken) {
    return response(res, 401, 'anda belum login')
  }

  jwt.verify(authtoken, process.env.JWT_KEYS, (err, decode) => {
    if (err) {
      return response(res, 401, err, true)
    } else {
      req.decode = decode
      next()
    }
  })
}

module.exports = authCheck
