const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const config = require('../nodemon.json')
const User = require('../api/models/user')

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
          grade: 68,
          outOf: 100
        }
      ]
    },
    {
      email: 'admin@email.com',
      firstName: 'Admin',
      lastName: 'User',
      password: bcrypt.hashSync('password', 10),
      teacher: true
    },
    {
      email: 'roxie@email.com',
      firstName: 'Roxie',
      lastName: 'User',
      password: bcrypt.hashSync('password', 10),
      teacher: false,
      assignments: [
        {
          title: 'My First Assigment',
          link: 'www.roxiedog.com/assignmentone',
          description: 'This is my first assignment',
          grade: 72,
          outOf: 100
        },
        {
          title: 'My Second Assignment',
          link: 'www.roxiedog.com/assignmenttwo',
          description: 'This is my second assignment',
          grade: 90,
          outOf: 100
        },
        {
          title: 'My Third Assignment',
          link: 'www.roxiedog.com/assignmentthree',
          description: 'This is my third assignment',
          grade: 48,
          outOf: 50
        }
      ]
    }
  ])
}

reset().catch(console.error).then((response) => {
  console.log(`Seeds successful! ${response.length} records created.`)
  return mongoose.disconnect()
})
