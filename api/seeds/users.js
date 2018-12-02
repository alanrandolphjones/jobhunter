// Require our user model soe we can create new users
const User = require('../models/User')

// Create an array to store our fake users
const users = []

//Create a fake user
const alan = new User({
    firstName: 'Alan', 
    lastName: 'Jones',
    userName: 'alan_jones',
    password: 'password',
    email: 'jones.alan21@gmail.com'
})

//Add to our fake user list
users.push(alan)

//One more time!
const rulo = new User({
    firstName: 'Rulo',
    lastName: 'Jones',
    userName: 'rulo_jones',
    password: 'password',
    email: 'rulo@gmail.com'
})

users.push(rulo)

module.exports = users