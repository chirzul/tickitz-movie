const bcrypt = require('bcrypt')

const securePassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const result = await bcrypt.hash(password, salt)
  return result
}
module.exports = securePassword
