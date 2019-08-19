const router = require('express').Router()

const { loggedInUser, sameUser } = require('../helper/helper')
// const { validate } = require('../middleware/users')

const User = require('../models/user')


//GET All registered users
router.get('/', loggedInUser, async (req, res, next) => {
  const status = 200
  const message = `You are seeing all registered users`
  // const { grade_lt, grade_gt } = req.query

  User.find(req.query).select('-__v -password')
  .then((user) => {
    res.status(status).json({ status, message, user })
  })
  .catch((error) => {
    //Error handling
    console.error(error)
    const e = new Error('Something went wrong with the GET users route.')
    e.status = 400
    next(e)
  })

})


//GET Individual User's info
router.get('/:userId', loggedInUser, (req, res, next) => {
  const status = 200

  User.findById(req.params.userId).select('-__v -password')
  .then((user) => {
    const message =  `You are seeing ${user.firstname} ${user.lastname}'s information.`
    res.status(status).json({ status, message, user })
  })
  .catch((error) => {
    //Error handling
    console.error(error)
    const e = new Error('Cannot access this accounts information.')
    e.status = 400
    next(e)
  })

})


//UPDATE individual user's info
router.put('/:userId', loggedInUser, sameUser, (req, res, next) => {
  const status = 200

  User.findOneAndUpdate({ _id: req.params.userId}, {...req.body}, {new:true}).select('-__v -password')
  .then((user) => {
    const message =  `You have successfully updated ${user.firstname} ${user.lastname}'s information.`
    res.status(status).json({ status, message, user })
  })
  .catch((error) => {
    //Error handling
    console.error(error)
    const e = new Error('Cannot access this accounts information.')
    e.status = 400
    next(e)
  })

})


//DELETE a user
router.delete('/:userId', loggedInUser, sameUser, (req, res, next) => {
  const status = 200

  User.findOneAndDelete({ _id: req.params.userId}, req.body).select('-__v -password')
  .then((user) => {
    const message =  `You have successfully deleted ${user.firstname} ${user.lastname}'s information.`
    res.status(status).json({ status, message, user })
  })
  .catch((error) => {
    //Error handling
    console.error(error)
    const e = new Error('Cannot access this accounts information.')
    e.status = 400
    next(e)
  })

})





module.exports = router
