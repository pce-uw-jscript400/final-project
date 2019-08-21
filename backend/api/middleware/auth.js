const User = require('../models/user')
const { decodeToken } = require('../lib/token')

const isNewUser = async (req, _res, next) => {
    const { username } = req.body
    
    const alreadyExists = await User.findOne({ username })
    if(alreadyExists){
        const message = `${username} already exists`
        const error = new Error(message)
        error.status = 400
        return next(error)
    }
    next()
}

const isValidPassword = (req, _res, next) => {
    const { password } = req.body

    if (password.length < 8) {
        const message = `Password must be at least 8 characters`
        const error = new Error(message)
        error.status = 400
        return next(error)
    }
    next()
}

const isLoggedIn = (req, _res, next) => {
    if (!req.token) {
        const message = `You are not logged in`
        const error = new Error(message)
        error.status = 401
        return next(error)
    }

    try{
        decodeToken(req.token)
        next()
    } catch (e) {
        console.error(e)
        const message = `There is a problem with your credentials`
        const error = new Error(message)
        error.status = 401
        next(error)
    }
}

const isSameUser = (req, _res, next) => {
    const id = req.params.userId
    const payload = decodeToken(req.token)
    if (payload.id === id) return next()

    const message = `You are not allowed to access this route.`
    const error = new Error(message)
    error.status = 401
    next(error)
}

module.exports = {isNewUser, isValidPassword, isLoggedIn, isSameUser}