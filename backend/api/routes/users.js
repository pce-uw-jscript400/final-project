const router = require('express').Router()
const User = require('../models/user')
const { isLoggedIn, isSameUser } = require('../middleware/auth')
const validate = require('../middleware/users')

const excludeKeys = '-__v -password'

router.get('/', isLoggedIn, (req, res, next) => {
    const status = 200
    const response = await User.find(req.query).select(excludeKeys)
    res.json({ status, response })
})


module.exports = router