const router = require('express').Router()
const User = require('../models/user')
// const { isLoggedIn, isSameUser } = require('../middleware/auth')
// const { validate } = require('../middleware/users')



const excludeKeys = '-__v -password'


//GET All registered users
router.get('/', async (req, res, next) => {
  const status = 200
  const message = `You are seeing all registered users`
  const { grade_lt, grade_gt } = req.query
  const response = await User.find(req.query).select(excludeKeys)

  res.status(status).json({ status, message, response })
  // if(grade_lt || grade_gt){
  //   const students = response.filter((student, grade_lt, grade_gt) => {
  //     console.log(grade_lt)
  //     return student.totalgrade > grade_gt && student.totalgrade <= grade_lt;
  //   })
  //   return res.json({ status, students })
  // }
})


//GET Individual User's info
router.get('/:userId', async (req, res, next) => {
  const status = 200
  const response = await User.findById(req.params.userId).select(excludeKeys)

  const message =  `You are seeing ${response.firstname} ${response.lastname}'s information.`
  res.status(status).json({ status, message, response })
})


//UPDATE individual user's info
router.put('/:userId', async (req, res, next) => {
  const status = 200
  console.log(req.params.userId)
  const query = { _id: req.params.userId }
  const response = await User.findOneAndUpdate(query, req.body, { new: true }).select(excludeKeys)

  res.json({ status, response })
})




module.exports = router
