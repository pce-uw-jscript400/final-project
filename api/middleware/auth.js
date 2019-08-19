const decode = require('../tokens/decode')

const userLoggedIn = (req, res, next) => {
  if (!req.token) next({ status: 401, message: 'You are not logged in.' })
  try {
    decode(req.token)
    next()
  } catch (e) {
    console.error(e)
    next({status: 401, message: 'There is a problem with your credentials.' })
  }
}


module.exports = { userLoggedIn }
