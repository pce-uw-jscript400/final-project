const router = require('express').Router()
const bcrypt = require('bcrypt')
const decode = require('../tokens/decode')
const generate = require('../tokens/generate')
const { signUpValidator, logInValidator, loggedInUser } = require('../helper/helper')

const User = require('../models/user')


router.get('/profile', loggedInUser, async (req, res, next) => {
  try {
    const payload = decode(req.mytoken)
    const user = await User.findOne({ _id: payload.id }).select('-__v -password')

    const status = 200
    res.json({ status, user })

  } catch (e) {
    console.error(e)
    const error = new Error('You are not authorized to access this route.')
    error.status = 401
    next(error)
  }
})


router.post('/login', logInValidator, async (req, res, next) => {
  const { email, password, firstname, lastname } = req.body

  try {
    const user = await User.findOne({ email })
    if (user) {
      const valid = await bcrypt.compare(password, user.password)
      if(valid) {
        const status = 200
        const response = 'You are now logged in.'
        const token = generate(user._id)
        return res.status(status).json({ status, response, token })
      }
    }
  } catch (e) {
    console.error(e)
    const error = new Error('You are not authorized to access this route.')
    error.status = 401
    next(error)
  }

  const message = `Username or password incorrect. Please check credentials and try again.`
  const error = Error(message)
  error.status = 401
  next(error)
})




router.post('/signup', signUpValidator, async (req, res, next) => {
  const { email, password, firstname, lastname } = req.body
  const rounds = 10
  const hashed = await bcrypt.hash(password, rounds)

  const email_taken = await User.findOne({ email })
  if (email_taken) {
    const error = new Error(`Username '${email}' is already taken.`)
    error.status = 400

    return next(error)
  }

  const status = 201
  const user = await User.create({ email, password: hashed, firstname, lastname })
  const token = generate(user._id)
  res.status(status).json({ status, email: user.email, token })
})




module.exports = router
