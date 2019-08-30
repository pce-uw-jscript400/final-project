const router = require('express').Router()
const User = require('../models/user')
const { isLoggedIn, isSameUser } = require('../middleware/auth')
const { validate } = require('../middleware/users')
const { decodeToken } = require('../lib/token')

const excludeKeys = '-__v -password'

/**
 * If user is a teacher display all information (grades and contact), if
 * user is a student display only contact information
 */
router.get('/', isLoggedIn, async (req, res, next) => {

  try{
  const status = 200

  const payload = decodeToken(req.token)
  const id = payload.id
  // console.log(`ALYCIALOG:${JSON.stringify(id)}`)
  const teacher = await User.findById(id)

  // console.log(teacher)

  let students = await User.find({'teacher': false})


  let filteredStudents = students.map(student=> {
      let studentReport = {
        email: student.email,
        firstName: student.firstName,
        lastName: student.lastName
      }
      if(teacher) {
        studentReport.grade = student.assignments.reduce((acc, assignment)=>{
          return {
            TotalGrade: assignment.grade + acc.TotalGrade,
            TotalOutOf: assignment.outOf + acc.TotalOutOf
          }
        }, {
          TotalOutOf:0,
          TotalGrade:0
        })
      }
      return studentReport;
  })

  const response = filteredStudents;
  res.json({ status, response })
}catch(error){
  const status = 400
    console.log(error)
    const response = 'There was an error';
    return res.status(status).json(response)
    next(error)
}

})

router.get('/profile', isLoggedIn, async (req, res, next) => {
  const status = 200
  const payload = decodeToken(req.token)
  const id = payload.id
  const response = await User.findById(id)
  res.json({ status, response })
})

module.exports = router
