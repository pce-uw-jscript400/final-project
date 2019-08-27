const mongoose = require('mongoose')
const Assignment = require('./assignment')

const schema = mongoose.Schema({
  email:{
    type: String,
    required: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  teacher:{
    type: Boolean,
    default: false
  },
  assignments: [Assignment]
})

module.exports = mongoose.model('User', schema)
