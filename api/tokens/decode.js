const { SECRET_KEY } = process.env
const {verify} = require('jsonwebtoken')

module.exports = (token) => {
  return verify(token, SECRET_KEY)
}
