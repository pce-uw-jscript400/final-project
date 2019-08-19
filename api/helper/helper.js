const decode = require('../tokens/decode')

const signUpValidator = (req, res, next) => {
  const {email, password, firstname, lastname} = req.body

  //Checks to see all required fields are provided
  if (!req.body) next({ status: 401, message: 'Missing request POST body!' })

  //Checks to see if username is empty
  if(!email) next({ status: 400, message: 'Please enter a username!' })

  //Checks to see if password is provided
  if(!password){
    next({ status: 400, message: 'Please enter a password!' })
  }else{
    //If password is provided validate for its length, error out if less then minimum of 8 characters
    if(password.length < 8) next({ status: 400, message: 'Invalid password length. Please enter at least 8 characters.' })
  }

  if(!firstname) next({ status: 400, message: 'Please enter your First Name!' })
  if(!lastname) next({ status: 400, message: 'Please enter your Last Name!' })

  next()
}


const logInValidator = (req, res, next) => {
  const {email, password} = req.body

  //Checks to see all required fields are provided
  if (!req.body) next({ status: 401, message: 'Missing request POST body!' })

  //Checks to see if username is empty
  if(!email) next({ status: 400, message: 'Please enter a username!' })

  //Checks to see if password is provided
  if(!password){
    next({ status: 400, message: 'Please enter a password!' })
  }else{
    //If password is provided validate for its length, error out if less then minimum of 8 characters
    if(password.length < 8) next({ status: 400, message: 'Invalid password length. Please enter at least 8 characters.' })
  }

  next()
}


const loggedInUser = (req, res, next) => {
  if (!req.mytoken) next({ status: 401, message: 'You are not logged in.' })
  try {
    decode(req.mytoken)
    next()
  } catch (e) {
    console.error(e)
    next({status: 401, message: 'There is a problem with your credentials.' })
  }
}


const sameUser = (req, _res, next) => {
  
  try {
    const id = req.params.userId
    const payload = decode(req.mytoken)
    if (payload.id === id) return next()
  } catch (e) {
    const error = new Error(`You are not authorized to access this route.`)
    error.status = 401
    next(error)
  }

}


module.exports = { signUpValidator, logInValidator, loggedInUser, sameUser }
