const User = require('../models/user')

const validate = async (req, _res, next) => {
  try {
    const user = new User(req.body)
    await user.validate()
    next()
  } catch (e) {
    e.status = 422
    return next(e)
  }
}

module.exports = { validate }
