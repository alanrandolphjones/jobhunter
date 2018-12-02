const express = require('express')
const Router = express.Router
const router = Router()
const { JobApp, Progress } = require('../models/JobApp')

router.get('/', async (req, res, next) => {
    try {
        // 1. Find all the users in our database
        const docs = await JobApp.find()

        // 2. If successful send back 200 OK with the users
        res.status(200).send({
            data: docs
        })
    } catch (e) {
        // 3. If unsuccessful, send the error into our error handler
        next(e)
    }
})

router.get('/:app_id', async (req, res, next) => {
    // 1. Get the user id out of the params
    const jobAppId = req.params.app_id
    console.log('hello')
    // 2. Look up a user by that ID
    try {
        const doc = await JobApp.findById(jobAppId)
        // .populate('user').populate('comments.user')
        // 3. If we find the specific user, send back 200 + the user doc
        res.status(200).send({
            data: [doc]
        })
    } catch (e) {
        // 4. If we don't handle the error 
        next(e)
    }
})

module.exports = router