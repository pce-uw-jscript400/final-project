const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const config = require('../nodemon.json')
const User = require('../api/models/user')

//TO DO: add 7 more students and assignments

const reset = async () => {
    mongoose.connect(config.env.MONGO_DB_CONNECTION, {useNewUrlParser: true})
    await User.deleteMany()
    const admin = await User.create([
        {
            firstName:'The',
            lastName:'Professor',
            password: bcrypt.hashSync('password', 10),
            email:'admin@email.com',
            admin: true
        }
    ])

    const students = await User.create([
        {
            firstName:'Tim',
            lastName:'Willis',
            password: bcrypt.hashSync('password', 10),
            email: 'timwillis@email.com',
            assignments: [
                {
                    title: 'CSS Grid project',
                    link: 'https://github.com/timwillis/project',
                    description: 'This is a project I did'
                }
            ]
        },
        {
            firstName: 'Wim',
            lastName: 'Tillis',
            password: bcrypt.hashSync('password', 10),
            email: 'wimtillis@gmail.com',
            assignments: [
                {
                    title: 'CSS Flexbox Project',
                    link: 'http://github.com/wimtillis/projectflexbox',
                    description: 'This is a project I did'
                }
            ]
        },
        {
            firstName: 'John',
            lastName: 'Smith',
            password: bcrypt.hashSync('password', 10),
            email: 'student@email.com',
            assignments:[
                {
                    title: `John Smith's Project`,
                    link: 'https://github.com/johnsmith/project',
                    description: 'This is a project I did'
                }
            ]
        }
    ])

    return {admin, students}
}

reset().catch(console.error).then((response) => {
    console.log(`Seeds successful! ${response.admin.length} admin created, ${response.students.length} students created.`)
    return mongoose.disconnect()
})
  