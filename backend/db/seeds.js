const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const config = require('../nodemon.json')
const User = require('../api/models/user')

const reset = async () => {
    mongoose.connect(config.env.MONGO_DB_CONNECTION, {useNewUrlParser: true})
    await User.deleteMany()
    return User.create([
        {
            firstName:'The',
            lastName:'Professor',
            password: bcrypt.hash('hardpassword', 10),
            email:'professor@school.edu',
            admin: true
        },
        {
            firstName:'Tim',
            lastName:'Willis',
            password: bcrypt.hash('password', 10),
            email: 'timwillis@email.com',
            assignments: [
                {
                    name: 'CSS Grid project',
                    link: 'https://github.com/timwillis/project',
                    description: 'This is a project I did'
                }
            ]
        },
        {
            firstName: 'Wim',
            lastName: 'Tillis',
            password: bcrypt.hash('password', 10),
            email: 'wimtillis@gmail.com',
            assignments: [
                {
                    name: 'CSS Flexbox Project',
                    link: 'http://github.com/wimtillis/projectflexbox'
                }
            ]
        },
        {
            firstName: 'John',
            lastName: 'Smith',
            password: bcrypt.hash(password, 10),
            email: 'johnsmith@gmail.com',
            assignments:[
                {
                    name: `John Smith's Project`,
                    link: 'https://github.com/johnsmith/project'
                }
            ]
        }
    ])
}

reset().catch(console.error).then((response) => {
    console.log(`Seeds successful! ${response.length} users created.`)
    return mongoose.disconnect()
  })
  