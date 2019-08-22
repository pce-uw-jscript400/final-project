const User = require('../models/user')
const { decodeToken } = require('../lib/token')

const isNewUser = async (req, _res, next) => {
    const { email } = req.body
    
    const alreadyExists = await User.findOne({ email })
    if(alreadyExists){
        const message = `${email} already exists`
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

const isAdmin = async (req, _res, next) => {
    const { id }  = decodeToken(req.token)
    const user = await User.findById(id)
    if (user.admin) return next()

    const message = `You are not allowed to access this route.`
    const error = new Error(message)
    error.status = 401
    next(error)
    
}
module.exports = { isNewUser, isLoggedIn, isSameUser, isAdmin}