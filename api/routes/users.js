const express = require('express')
const Router = express.Router
const router = Router()
const { User } = require('../models/User')
const schedule = require('node-schedule');

// GET /users
router.get('/', async (req, res, next) => {

    try {
        // 1. Find all the users in our database
        const docs = await User.find()

        // 2. If successful send back 200 OK with the users
        console.log(doc)
        res.status(200).send({
            data: docs
        })
    } catch (e) {
        // 3. If unsuccessful, send the error into our error handler
        next(e)
    }
})

// Get /users/:user_id
router.get('/:user_id', async (req, res, next) => {
    // 1. Get the user id out of the params
    const userId = req.params.user_id
    // 2. Look up a user by that ID
    try {
        const doc = await User.findById(userId)
        // 3. If we find the specific user, send back 200 + the user doc
        console.log(doc)
        res.status(200).send({
            data: [doc]
        })
    } catch (e) {
        // 4. If we don't handle the error 
        next(e)
    }
})

// POST /users
router.post('/', async (req, res, next) => {

    const user = new User(req.body.user)
    
    try {
        const doc = await user.save()
        //4. Respond with created todo
        res.status(201).send({
            data: [doc]
        })
    } catch (e) {
        // 5. If error, send to the error handler
        next(e)
    }
    
})

router.put('/:user_id/jobApp', async (req, res) => {

    const user = new User(req.body.user)

    User.findByIdAndUpdate(
        user._id, 
        { $set: user })
        .then(doc => {
            console.log(doc)
            res.status(201).json({ message: "Success", payload: doc });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: err.message });
        });
     
})

daysBetween = function (date1, date2) {
    //Get 1 day in milliseconds
    var one_day = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = date2_ms - date1_ms;

    // Convert back to days and return
    return Math.round(difference_ms / one_day);
}

dailyUpdate = () => {

    User.find({}).then((users) => {
        //Loop through users
        users.forEach((user) => {
            //Loop through job apps and find ones which have been left alone too long
            user.jobApps = user.jobApps.map((app) => {
                const interactions = app.progress.interactions
                const lastInteraction = interactions[interactions.length - 1]
                if (interactions.length > 0) {
                    const followups = lastInteraction.followups
                    if (followups.length > 0) {
                        const lastFollowup = followups[followups.length - 1]
                        const dateDiff = daysBetween(lastFollowup, new Date())
                        //Change status if there is nothing left for user to do
                        if (followups.length >= 3 && dateDiff > 7) {
                            app.progress.status = 'rejected'
                        }
                    }
                }

                return app

            })
            //Save new user profile to db
            User.findByIdAndUpdate(
                user._id,
                {$set: user}
            ).then((doc) => {
                console.log('data updated')
            })

        })
    })
}

//Scheduled daily update at midnight
const update = schedule.scheduleJob({hour: 0, minute: 00}, function () {
    dailyUpdate()
});

// Export router so that it is available to our server
module.exports = router