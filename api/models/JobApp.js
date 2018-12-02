// Require mongoose 
const mongoose = require('mongoose')

// Store reference to mongoose.Scheme in variable
const Schema = mongoose.Schema

// Define the schema

const progressSchema = new Schema({
    applicationDate: {
        type: Date
    },
    firstFollowUp: {
        type: Date
    },
    secondFollowUp: {
        type: Date
    },
    thirdFollowUp: {
        type: Date
    },
    response: {
        type: String
    },
    firstInterview: {
        type: Date
    },
    interviewContact: {
        type: String
    },
    comments: {
        type: String
    },
    state: {
        type: String
    }
})

const jobAppSchema = new Schema({
    position: {
        type: String,
        required: true
    },
    company: {
        type: String,
    },
    contactEmail: {
        type: String,
    },
    contactFirstName: {
        type: String,
    },
    contactLastName: {
        type: String,
    },
    jobBoard: {
        type: String,
    },
    postingUrl: {
        type: String,
    },
    postDate: {
        type: Date,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: {
        type: String
    },
    progress: [progressSchema]
})



module.exports = {
    JobApp: mongoose.model('JobApp', jobAppSchema),
    Progress: mongoose.model('Progress', progressSchema)
}