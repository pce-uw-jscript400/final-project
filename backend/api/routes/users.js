const router = require('express').Router()
const User = require('../models/user')
const { isLoggedIn, isSameUser, isAdmin } = require('../middleware/auth')
const validate = require('../middleware/users')

const excludeKeys = '-__v -password -admin'

router.get('/', isLoggedIn, isAdmin, async (req, res, next) => {
    const status = 200
    const response = await User.find(req.query).select(excludeKeys)
    res.json({ status, response })
})

router.get('/:userId', isLoggedIn, isSameUser, async( req, res, next) => {
    const status = 200
    const response = await User.findById(req.params.userId).select(excludeKeys)
    res.json({ status, response })
})


module.exports = router
