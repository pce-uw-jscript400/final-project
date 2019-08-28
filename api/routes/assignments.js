const router = require('express').Router({ mergeParams: true })
const { loggedInUser, sameUser } = require('../helper/helper')

const User = require('../models/user')



//GET All assignments of a logged in user
///api/v1/users/:userId/assignments
router.get('/', loggedInUser, sameUser, (req, res, next) => {
  const status = 200
  const message = `You are seeing all your assignments`

  User.findById(req.params.userId)
  .then((user) => {
    const assignment = user.assignments
    res.status(status).json({ status, message, assignment })
  })
  .catch((error) => {
    //Error handling
    console.error(error)
    const e = new Error('Something went wrong with the GET assignments route.')
    e.status = 400
    next(e)
  })

})

//GET One assignment
router.get('/:assignmentId', loggedInUser, sameUser, (req, res, next) => {

  User.findById(req.params.userId)
  .then((user) => {
    const status = 201
    
    const assignment = user.assignments.id(req.params.assignmentId)

    console.log(assignment)

    const message = `You have successfully retrieved one assignment information.`
    res.status(status).json({ status, message, assignment })

  })
  .catch((error) => {
    //Error handling
    console.error(error)
    const e = new Error('One Assignment GET Failed.')
    e.status = 400
    next(e)
  })

})



// /api/v1/users/:userId/assignments  - sameUser is not working
router.post('/', loggedInUser, sameUser, (req, res, next) => {
  const status = 201

  User.findById(req.params.userId)
  .then((user) => {
    console.log(user)
    user.assignments.push({...req.body})
    user.save()
    // const assignment = user.assignments[user.assignments.length - 1]
    res.status(status).json({ status, response: user })
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

    user.assignments = user.assignments.filter((assignment) => {
      return assignment.id !== req.params.assignmentId
    })
    user.save()

    const message = `You have successfully deleted assignment.`
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
