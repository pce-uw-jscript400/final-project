const mongoose = require('mongosse')
const Assignment = require('./assignment')
//again using the validator package because I don't feel like enforcing all the new TLDs
const isEmail = require('validator/lib/isEmail')


const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: isEmail,
            message: props => `${props.value} is not a valid email address`
        }
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        default: false
    },
    assignments: [Assignment]

}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

module.exports = mongoose.model('User', schema)