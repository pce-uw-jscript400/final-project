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
          link: 'https://randomuser.me/',
          received: 0,
          score:0
        },
        {
          title: 'Flexbox Exercise',
          description: 'An exercise for working with Flexbox.',
          link: 'https://randomuser.me/',
          received: 0,
          score:0
        }
      ],
      totalgrade: 0,
      admin: false
    },
    {
      firstname: 'Breanna',
      lastname: 'McGrath',
      email: 'breanna.mcgrath@email.com',
      password: bcrypt.hashSync('password', 10),
      assignments: [
        {
          title: 'HTML & CSS Final Project',
          description: 'My final project for the HTML & CSS course.',
          link: 'http://www.breannamcgrath.com',
          received: 0,
          score:0
        },
        {
          title: 'Flexbox Exercise',
          description: 'An exercise for working with Flexbox.',
          link: 'https://randomuser.me/',
          received: 0,
          score:0
        }
      ],
      totalgrade: 0,
      admin: false
    },
    {
      firstname: 'Macy',
      lastname: 'Humphries',
      email: 'mhumphries@email.com',
      password: bcrypt.hashSync('password', 10),
      assignments: [
        {
          title: 'HTML & CSS Final Project',
          description: 'My final project for the HTML & CSS course.',
          link: 'http://www.mhumphries.com',
          received: 0,
          score:0
        },
        {
          title: 'Flexbox Exercise',
          description: 'An exercise for working with Flexbox.',
          link: 'https://randomuser.me/',
          received: 0,
          score:0
        }
      ],
      totalgrade: 0,
      admin: false
    },
    {
      firstname: 'Ivor',
      lastname: 'Davison',
      email: 'ivor.davison@email.com',
      password: bcrypt.hashSync('password', 10),
      assignments: [
        {
          title: 'HTML & CSS Final Project',
          description: 'My finalproject. Sorry this is late!!!',
          link: 'http://www.ivor.davison.com',
          received: 0,
          score:0
        },
        {
          title: 'Flexbox Exercise',
          description: 'An exercise for working with Flexbox.',
          link: 'https://randomuser.me/',
          received: 0,
          score:0
        }
      ],
      totalgrade: 0,
      admin: false
    },
    {
      firstname: 'Daanyal',
      lastname: 'Ventura',
      email: 'daanventura@email.com',
      password: bcrypt.hashSync('password', 10),
      assignments: [
        {
          title: 'HTML & CSS Final Project',
          description: 'My final project for the HTML & CSS course.',
          link: 'http://www.daanventura.com',
          received: 0,
          score:0
        },
        {
          title: 'Flexbox Exercise',
          description: 'An exercise for working with Flexbox.',
          link: 'https://randomuser.me/',
          received: 0,
          score:0
        }
      ],
      totalgrade: 0,
      admin: false
    },
    {
      firstname: 'Tyson',
      lastname: 'Atherton',
      email: 'tyson.atherton@email.com',
      password: bcrypt.hashSync('password', 10),
      assignments: [
        {
          title: 'HTML & CSS Final Project',
          description: 'This was so fun to work on!',
          link: 'http://www.tyson.atherton.com',
          received: 0,
          score:0
        },
        {
          title: 'Flexbox Exercise',
          description: 'An exercise for working with Flexbox.',
          link: 'https://randomuser.me/',
          received: 0,
          score:0
        }
      ],
      totalgrade: 0,
      admin: false
    },
    {
      firstname: 'Chris',
      lastname: 'Curtis',
      email: 'chris.curtis@email.com',
      password: bcrypt.hashSync('password', 10),
      assignments: [
        {
          title: 'HTML & CSS Final Project',
          description: 'This was so fun to work on!',
          link: 'http://www.tyson.atherton.com',
          received: 0,
          score:0
        },
        {
          title: 'Flexbox Exercise',
          description: 'An exercise for working with Flexbox.',
          link: 'https://randomuser.me/',
          received: 0,
          score:0
        }
      ],
      totalgrade: 0,
      admin: false
    },
    {
      firstname: 'Steven',
      lastname: 'Turner',
      email: 'steven.turner@email.com',
      password: bcrypt.hashSync('password', 10),
      assignments: [
        {
          title: 'HTML & CSS Final Project',
          description: 'This was so fun to work on!',
          link: 'http://www.tyson.atherton.com',
          received: 0,
          score:0
        },
        {
          title: 'Flexbox Exercise',
          description: 'An exercise for working with Flexbox.',
          link: 'https://randomuser.me/',
          received: 0,
          score:0
        }
      ],
      totalgrade: 0,
      admin: false
    },
    {
      firstname: 'Heather',
      lastname: 'Campbell',
      email: 'heather.campbell@email.com',
      password: bcrypt.hashSync('password', 10),
      assignments: [
        {
          title: 'HTML & CSS Final Project',
          description: 'This was so fun to work on!',
          link: 'http://www.tyson.atherton.com',
          received: 0,
          score:0
        },
        {
          title: 'Flexbox Exercise',
          description: 'An exercise for working with Flexbox.',
          link: 'https://randomuser.me/',
          received: 0,
          score:0
        }
      ],
      totalgrade: 0,
      admin: false
    },
    {
      firstname: 'Jane',
      lastname: 'Buck',
      email: 'jane.buck@email.com',
      password: bcrypt.hashSync('password', 10),
      assignments: [
        {
          title: 'HTML & CSS Final Project',
          description: 'This was so fun to work on!',
          link: 'http://www.tyson.atherton.com',
          received: 0,
          score:0
        },
        {
          title: 'Flexbox Exercise',
          description: 'An exercise for working with Flexbox.',
          link: 'https://randomuser.me/',
          received: 0,
          score:0
        }
      ],
      totalgrade: 0,
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
          received: 0,
          score:0
        },
        {
          title: 'Flexbox Exercise',
          description: 'An exercise for working with Flexbox.',
          link: 'https://randomuser.me/',
          received: 0,
          score:0
        }
      ],
      totalgrade: 0,
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
