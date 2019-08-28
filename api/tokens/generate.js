const { SECRET_KEY } = process.env
const { sign } = require('jsonwebtoken')

module.exports = (id, admin, firstname) => {
  const payload = { id, admin, firstname }
  console.log(payload)
  const options = { expiresIn: '2 day' }
  return sign(payload, SECRET_KEY, options)
}
