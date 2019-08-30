const router = require('express').Router()
const User = require('../models/user')
const { isLoggedIn, isSameUser } = require('../middleware/auth')
const setToken = require('../middleware/set-token')
const { decodeToken, generateToken } = require('../lib/token')

const ObjectId = require('mongoose').Types.ObjectId

const excludeKeys = '-__v -password'

router.post('/new', isLoggedIn, async (req, res, next) => {
    try{
        const status = 200
        let newAssignment = req.body
        let payload = decodeToken(req.token)
        let user = await User.findById(payload._id)
        let assignments = user.assignments
        assignments.push(newAssignment)
        user.save()
        response = assignments
        res.json({ status, response })
    }catch(e){
        const status = 400
        console.log(`Error: ${e.message}`)
        const response = 'There was an error';
        return res.status(status).json(response)
        next(e)
    }
})

router.put('/:assignmentId/edit', isLoggedIn, isSameUser, async (req, res, next) => {
    try{
      const status = 200
      const assignmentId = { _id: req.params.assignmentId }
      let payload = decodeToken(req.token)
      let user = await User.findById(payload._id)
      let assignment = user.assignments.id(assignmentId)
      assignment.set(req.body)
      user.save()
      let response = assignment
      res.json({ status, response })
    }catch (err){
      console.log(`My Error: ${err}`)
      const error = new Error(err.message)
      error.status = 400
      next(error)
    }

  })

  router.delete('/', isLoggedIn, async (req, res, next) => {
    try{
      const status = 200
      let payload = decodeToken(req.token)
      let  id = payload._id
      let user = await User.findById(id)
      let assignment = user.assignments.id(req.body)
      assignment.remove()
      await user.save()
      let response = `Deleted ${assignment.name}`
      res.json({ status, response})
    }catch(e){
      const status = 400
      console.log(`Error: ${e.message}`)
      const response = 'There was an error';
      return res.status(status).json(response)
      next(e)
    }
  })

module.exports = router