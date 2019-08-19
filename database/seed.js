const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const config = require('../nodemon.json')
const User = require('../api/models/user')

const reset = async () => {
  mongoose.connect(config.env.MONGO_DB, { useNewUrlParser: true })
  // Careful with .remove() -- it sends a command directly to the database
  // and skips any mongoose validations
  await User.deleteMany() // Deletes all records
  return User.create([
    {
      firstname: 'Marnel',
      lastname: 'Mangrubang',
      email: 'marnel.mangrubang@email.com',
      password: bcrypt.hashSync('password', 10),
      assignments: [
        {
          title: 'HTML & CSS Final Project',
          description: 'My final project for the HTML & CSS course.',
          link: 'http://www.marnelmangrubang.me',
          received: 99,
          score:100
        }
      ],
      totalgrade: 69,
      admin: false
    },
    {
      firstname: 'Student',
      lastname: 'Lastname',
      email: 'student@email.com',
      password: bcrypt.hashSync('password', 10),
      assignments: [
        {
          title: 'HTML & CSS Final Project',
          description: 'Final Project assignment from Student',
          link: 'http://www.student.com',
          received: 79,
          score:100
        }
      ],
      totalgrade: 59,
      admin: false
    },
    {
      firstname: 'Admin',
      lastname: 'Lastname',
      email: 'admin@email.com',
      password: bcrypt.hashSync('password', 10),
      assignments: [],
      totalgrade: 0,
      admin: true
    }
  ])
}

reset().catch(console.error).then((response) => {
  console.log(`Seeds successful! ${response.length} records created.`)
  return mongoose.disconnect()
})
