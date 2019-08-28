const router = require('express').Router()
const bcrypt = require('bcrypt')
const decode = require('../tokens/decode')
const generate = require('../tokens/generate')
const { signUpValidator, logInValidator, loggedInUser } = require('../helper/helper')

const User = require('../models/user')



//GET PROFILE for logged in user - DONE
router.get('/profile', loggedInUser, (req, res, next) => {

  const payload = decode(req.mytoken)

  User.findOne({ _id: payload.id }).select('-__v -password')
  .then((user) => {
    const status = 200
    const message =  `You are seeing ${user.firstname} ${user.lastname}'s information.`
    res.status(status).json({ status, message, user })
  })
  .catch((error) => {
    //Error handling
    console.error(error)
    const e = new Error(`You are not authorized to access this route.`)
    e.status = 401
    next(e)
  })

})



//LOGIN user - DONE
router.post('/login', logInValidator, (req, res, next) => {
  const { email, password } = req.body

    User.findOne({ email })
    .then((user) => {
      if(user) {
        bcrypt.compare(password, user.password)
        .then((pass) => {
          if(pass) {
            const status = 200
            const response = `You are now logged in as ${user.firstname} ${user.lastname}.`
            const token = generate(user._id, user.admin, user.firstname)
            return res.status(status).json({ status, response, token })
          }else{
            const message = `Password incorrect. Please try again.`
            const error = Error(message)
            error.status = 401
            next(error)
          }

        })
        .catch((e) => {
          console.error(e)
          e.status = 401
          next(e)
        })
      }else{
        const message = `Username incorrect. Please try again.`
        const error = Error(message)
        error.status = 401
        next(error)
      }

    })
    .catch((err) => {
      err.status = 401
      next(err)
    })

})


//SIGNUP New Users - DONE
router.post('/signup', signUpValidator, async (req, res, next) => {
  const { email, password, firstname, lastname } = req.body

  const hashedPassword = await bcrypt.hash(password, 10) //Leaving this as an async/await because a Promise keeps failing

  bcrypt.hash(password, 10)
  .then((hashed) => {

    if(hashed){
      const hashedPassword = hashed
    }

    User.findOne({ email })
    .then((email_taken) => {
      if (email_taken) {
        const error = new Error(`Username '${email}' is already taken.`)
        error.status = 400
        return next(error)
      }

      const status = 201
      User.create({ email, password: hashedPassword, firstname, lastname })
      .then((user) => {
        const token = generate(user._id, user.admin, user.firstname)
        res.status(status).json({ status, email: user.email, token })
      })
      .catch((err) => {
        console.error(err)
      })

    })
    .catch((e) => {
      console.error(e)
    })

  })
  .catch((error) => {
    console.error(error)
  })

})




module.exports = router
