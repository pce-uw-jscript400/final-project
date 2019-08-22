const router = require('express').Router({mergeParams: true}) //include userId
const User = require('../models/user')
const { isLoggedIn, isSameUser, isAdmin } = require('../middleware/auth')

router.get('/', isLoggedIn, isSameUser, async (req, res, next) => {

})

router.put('/:assignmentId', isLoggedIn, isSameUser, async (req, res, next) => {

})

router.put('/:assignmentId/score', isLoggedIn, isAdmin, async (req, res, next) => {

})

router.delete('/:assignmentId', isLoggedIn, isSameUser, async (req, res, next) => {

})

module.exports(router)