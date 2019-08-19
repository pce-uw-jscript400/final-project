const { SECRET_KEY } = process.env
const jwt = require('jsonwebtoken')

module.exports = (id) => {
  const payload = { id }
  const options = { expiresIn: '1 day' }
  return jwt.sign(payload, SECRET_KEY, options)
}
