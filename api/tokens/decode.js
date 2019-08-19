const { SECRET_KEY } = process.env
const jwt = require('jsonwebtoken')

module.exports = (token) => {
  jwt.verify(token, SECRET_KEY)
}
