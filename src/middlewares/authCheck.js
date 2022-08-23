const jwt = require('jsonwebtoken')
const response = require('../helpers/response')

const authCheck = (roles) => {
  return (req, res, next) => {
    const { authtoken } = req.headers

    if (!authtoken) {
      return response(res, 401, 'anda belum login')
    }

    jwt.verify(authtoken, process.env.JWT_KEYS, (err, decode) => {
      if (err) {
        return response(res, 401, err, true)
      } else {
        if (roles.includes(decode.role)) {
          req.decode = decode
          next()
        } else {
          return response(res, 401, 'anda tidak memiliki akses')
        }
      }
    })
  }
}

module.exports = authCheck
