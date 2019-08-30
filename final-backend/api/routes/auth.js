const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { isLoggedIn, isSameUser } = require('../middleware/auth')
const { decodeToken, generateToken } = require('../lib/token')

router.post('/login', async (req, res, next) => {
  try{
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user){
      const status = 404
      next(error)
    }
    if (user) {
      const valid = await bcrypt.compare(password, user.password)
      if (valid) {
        const status = 200
        const response = 'Login Sucessful.'
        const token = generateToken(user._id)
        return res.status(status).json({ status, response, token })
      }
    }
  }catch{
      const message = `Invalid login credentials. Please check your email and password and try agian!`
      const error = Error(message)
      error.status = 401
      next(error)
  }
})

router.post('/signup', async (req, res, next) => {
  try{
    const { email, firstName, lastName, password } = req.body
    const rounds = 10
    const hashed = await bcrypt.hash(password, rounds)

    const alreadyExists = await User.findOne({ email })
      if (alreadyExists) {
        const error = new Error(`There is already an account with that email '${email}'.`)
        error.status = 400
        return next(error)
    }
    const status = 201
    const user = await User.create({ email, password: hashed, firstName, lastName })
    const token = generateToken(user._id)
    res.status(status).json({ status, token })
  }catch(e){
    const status = 400
    console.log(`Error: ${e.message}`)
    const response = 'There was an error';
    return res.status(status).json(response)
    next(e)
  }
})

module.exports = router
