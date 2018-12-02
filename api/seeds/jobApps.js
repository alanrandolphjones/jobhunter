// Require our user model soe we can create new users
const { JobApp, Progress } = require('../models/JobApp')
const users = require('./users')

// Create an array to store our fake users
const jobApps = []

//Create a fake user
const startup = new JobApp({
    position: "Front End Developer",
    company: "Very Cool Startup",
    contactEmail: "recruiter@coolstartup.com",
    contactFirstName: "Mark",
    contactLastName: "Zuckerberg",
    user: users[0]
})

const startupProgress = new Progress({
    applicationDate: Date('November 28 2018'),
    state: "inProgress"
})

startup.progress = startupProgress

jobApps.push(startup)

const bigCorp = new JobApp({
    position: "Email Developer",
    company: "Big Corporation",
    contactEmail: "recruiter@bigcorp.com",
    contactFirstName: "Bill",
    contactLastName: "Gates",
    postingUrl: 'http://www.linkedin.com/jobposting',
    postDate: Date('November 14, 2018'),
    user: users[0]
})

const bigCorpProgress = new Progress({
    applicationDate: Date('November 20 2018'),
    firstFollowUp: Date('Novembet 27, 2018'),
    state: "inProgress"
})

bigCorp.progress = bigCorpProgress

jobApps.push(bigCorp)

const dreamCompany = new JobApp({
    position: "Full Stack Developer",
    company: "Dream Company",
    contactEmail: "jerry@dream.co",
    contactFirstName: "Jerry",
    contactLastName: "Dreamer",
    postingUrl: 'http://www.linkedin.com/jobposting2',
    postDate: Date('November 1, 2018'),
    user: users[0]
})

const dreamCompanyProgress = new Progress({
    applicationDate: Date('November 2, 2018'),
    firstFollowUp: Date('November 9, 2018'),
    response: "interview",
    interviewDate: Date('December 10 2018'),
    state: "inProgress",
    interviewContact: 'CEO',
    comments: "interview at Cool Office Building with lots of beanbags downtown."
})

dreamCompany.progress = dreamCompanyProgress

jobApps.push(dreamCompany)

const anotherJob = new JobApp({
    position: "Web Developer",
    company: "Another Company",
    contactEmail: "someguy@another.co",
    contactFirstName: "Some",
    contactLastName: "Recruiter",
    postingUrl: 'http://www.monster.com/jobposting',
    postDate: Date('October 15, 2018'),
    user: users[0]
})

const anotherJobProgress = new Progress({
    applicationDate: Date('October 17, 2018'),
    firstFollowUp: Date('October 24, 2018'),
    secondFollowUp: Date('November 2 2018'),
    thirdFollowUp: Date('November 10, 2018'),
    interviewDate: Date('December 10 2018'),
    state: "completed",
})

anotherJob.progress = anotherJobProgress

jobApps.push(anotherJob)

module.exports = jobApps

