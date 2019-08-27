const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  link : {
    type: String,
    required: true
  },
  description: String,
  grade: Number,
  outOf: Number
})

module.exports = schema
