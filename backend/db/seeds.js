const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const config = require('../nodemon.json')
const User = require('../api/models/user')

const reset = async () => {
  mongoose.connect(config.env.MONGO_DB_CONNECTION, { useNewUrlParser: true })
  // Careful with .remove() -- it sends a command directly to the database
  // and skips any mongoose validations
  await User.deleteMany() // Deletes all records
  return User.create([
    {
      firstname: "Admin",
      lastname: "User",
      email: "admin@email.com",
      password: bcrypt.hashSync("password", 10),
      admin: true
    },
    {
      firstname: 'Student',
      lastname: 'User',
      email: 'student@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: false
    },
    {
      firstname: 'Breanna',
      lastname: 'McGrath',
      email: 'breanna.mcgrath@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: false
    },
    {
      firstname: 'Macy',
      lastname: 'Humphries',
      email: 'mhumphries@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: false
    },
    {
      firstname: 'Ivor',
      lastname: 'Davison',
      email: 'ivor.davison@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: false
    },
    {
      firstname: 'Daanyal',
      lastname: 'Ventura',
      email: 'daanventura@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: false
    },
    {
      firstname: 'Tyson',
      lastname: 'Atherton',
      email: 'tyson.atherton3@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: false
    },
    {
      firstname: 'Thor',
      lastname: 'Odinson',
      email: 'thor.odinson@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: false
    },
    {
      firstname: 'Steve',
      lastname: 'Rogers',
      email: 'steve.rogers@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: false
    },
    {
      firstname: 'Natasha',
      lastname: 'Romanoff',
      email: 'nromanoff@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: false
    },
    {
      firstname: 'Clint',
      lastname: 'Barton',
      email: 'hawkeye@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: false
    },
    {
      firstname: 'Tony',
      lastname: 'Stark',
      email: 'tonystark@email.com',
      password: bcrypt.hashSync('password', 10),
      admin: true
    }
  ])
}

reset().catch(console.error).then((response) => {
  console.log(`Seeds successful! ${response.length} records created.`)
  return mongoose.disconnect()
})
