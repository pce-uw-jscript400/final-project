const router = require('express').Router({ mergeParams: true })
const { loggedInUser, sameUser } = require('../helper/helper')

const User = require('../models/user')




// /api/v1/users/:userId/assignments
router.post('/', loggedInUser, sameUser, (req, res, next) => {
  const status = 201

  User.findById(req.params.userId)
  .then((user) => {
    console.log(user)
    user.assignments.push({...req.body})
    user.save()
    // const assignment = user.assignments[user.assignments.length - 1]
    res.status(status).json({ status, response: assignment })
  })
  .catch((error) => {
    //Error handling
    console.error(error)
    const e = new Error('Assignment POST Failed.')
    e.status = 400
    next(e)
  })

})




//UPDATE an assignment
router.put('/:assignmentId', loggedInUser, sameUser, (req, res, next) => {
  const status = 200

  User.findById(req.params.userId)
  .then((user) => {

    const assignment = user.assignments.id(req.params.assignmentId)

    const { title, description, link, received, score } = req.body

    assignment.title = title
    assignment.description = description
    assignment.link = link
    assignment.received = received
    assignment.score = score

    user.save()

    const message = `You have successfully updated an assignment information.`
    res.status(status).json({ status, message, user })

  })
  .catch((error) => {
    //Error handling
    console.error(error)
    const e = new Error('Assignment PUT Failed.')
    e.status = 400
    next(e)
  })

})



//DELETE an assignment - WORKING ON THIS
router.delete('/:assignmentId', loggedInUser, sameUser, (req, res, next) => {
  const status = 200

  User.findById(req.params.userId)
  .then((user) => {

    user.assignments = user.assignments.filter(assignment => assignment.id !== req.params.assignmentId)
    user.save()

    const message = `You have successfully deleted an assignment.`
    res.status(status).json({ status, message, user })
  })
  .catch((error) => {
    //Error handling
    console.error(error)
    const e = new Error('Assignment DELETE Failed.')
    e.status = 400
    next(e)
  })

})



module.exports = router
