const mongoose = require('mongoose')

const isURL = require('validator/lib/isURL')


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true,
        validate: {
            validator: isURL,
            message: props => `${props} is not a valid URL!`
        }
    },
    description: {
        type: String
    },
    grade: {
        type: Number,
        //will this work?
        validate: {
            validator: grade => grade <= this.max,
            message: props => `${props} must be less than ${this.max}`
        }
    },
    max: {
        type: Number
    }
})

module.exports = schema