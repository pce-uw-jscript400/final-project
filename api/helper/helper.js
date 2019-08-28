const decode = require('../tokens/decode')

const signUpValidator = (req, res, next) => {
  const {email, password, firstname, lastname} = req.body
  try {
    //Checks to see all required fields are provided
    if (!req.body) next({ status: 400, message: 'Missing request POST body!' })

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
  } catch (e) {
    console.error(e)
    next({status: 400, message: 'Something went wrong with the values you entered.' })
  }

}


const logInValidator = (req, res, next) => {
  const {email, password} = req.body

  try {
    //Checks to see all required fields are provided
    if (!req.body) next({ status: 400, message: 'Missing request POST body!' })

    //Checks to see if username is empty
    if(!email) next({ status: 400, message: 'Please enter a username!' })

    //Checks to see if password is provided
    if(!password) next({ status: 400, message: 'Please enter a password!' })

    //If password is provided validate for its length, error out if less then minimum of 8 characters
    if(password.length < 8) next({ status: 400, message: 'Invalid password length. Please enter at least 8 characters.' })

    next()

  }catch (e) {
    console.error(e)
    next({status: 401, message: 'There is a problem with your credentials.' })
  }

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
    console.log(payload)
    if (payload.id === id || payload.admin === true) return next()

    const e = new Error('You have no right to add an assignment to this users account.')
    e.status = 400
    next(e)

  } catch (e) {
    console.error(e)
    next({status: 401, message: 'You are not authorized to access this route.' })
  }

}

//
// const adminUser = (req, _res, next) => {
//   try {
//     const payload = decode(req.mytoken)
//     console.log(payload)
//     if (payload.admin === true) return next()
//
//     const err = new Error('You are not an admin.')
//     err.status = 400
//     next(err)
//
//   } catch (e) {
//     console.error(e)
//     next({status: 401, message: `You are not an admin user. You do not have access to this route.`})
//   }
//
// }



module.exports = { signUpValidator, logInValidator, loggedInUser, sameUser }
