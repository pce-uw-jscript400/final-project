const mongoose = require('mongoose')
const Assignment = require('./assignment')

const schema = mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  assignments: [Assignment],
  totalgrade: {
    type: Number,
    default: 0
  },
  admin: {
    type: Boolean,
    default: false
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('User', schema)
