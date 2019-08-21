const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { decodeToken, generateToken } = require('../lib/token')

const { isNewUser, isValidPassword } = require('../middleware/auth')

router.get('/profile', async (req, res, next) => {
    try {
        const payload = decodeToken(req.token)
        const user = await User.findOne({_id: payload.id}).select('-__v password')

        const status = 200
        res.json({status, user})
    } catch (e) {
        console.error(e)
        const message = `You are not authorized to view this route.`
        const error = new Error(message)
        error.status = 401
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    const { username, password } = req.body
    const user = await User.findOne({username})

    if(user) {
        const valid = await bcrypt.compare(password, user.password)
        if(valid){
            const status = 200
            const response = 'You are logged in'
            const token = generateToken(user._id)
            return res.status(status).json({ status, message, token })
        }
    }

    const message = `Username or password incorrect. Please check your credentials and try again.`
    const error = new Error(message)
    error.status = 401
    next(error)
})

router.post('/signup', isNewUser, isValidPassword, async (req, res, next) => {
    const { username, password } = req.body
    const rounds = 10
    const hashed = await bcrypt.hash(password, rounds)

    const status = 201
    const user = await User.create({username, password: hashed})
    const token = generateToken(user._id)
    res.status(status).json({ status, token})
})

module.exports = router