// Require mongoose 
const mongoose = require('mongoose')

// Store reference to mongoose.Scheme in variable
const Schema = mongoose.Schema

// Define the schema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)