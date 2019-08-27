const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const config = require('../nodemon.json')
const User = require('../api/models/user')
//const assignments = require('../api/models/assignment')

const reset = async () => {
  mongoose.connect(config.env.MONGO_DB_CONNECTION, { useNewUrlParser: true })
  await User.deleteMany() // Deletes all records
  return User.create([
    {
      email: 'student@email.com',
      firstName: 'Student',
      lastName: 'User',
      password: bcrypt.hashSync('password', 10),
      teacher: false,
      assignments: [
        {
          title: 'My First Assigment',
          link: 'https:www.myfirstassignment.com',
          description: 'This is my first assignment',
          grade: 68
        }
      ]
    },
    {
      email: 'admin@email.com',
      firstName: 'Admin',
      lastName: 'User',
      password: bcrypt.hashSync('password', 10),
      teacher: true
    }
  ])
}

reset().catch(console.error).then((response) => {
  console.log(`Seeds successful! ${response.length} records created.`)
  return mongoose.disconnect()
})
