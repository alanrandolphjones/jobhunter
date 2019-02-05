import React, { Component } from 'react'
import { Table, Button, Modal } from 'react-bootstrap'
import axios from 'axios'
import ProgressPopup from './ProgressPopup'
import ChangeStatusPopup from './ChangeStatusPopup'

export default class Progress extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            progress: null,
            nextActionDate: null,
            progressShow: false,
            lastActionDate: null
        }

        this.changeStatus = this.changeStatus.bind(this)
        this.updateDatabase = this.updateDatabase.bind(this)
        this.addFollowup = this.addFollowup.bind(this)
        this.handleProgressClose = this.handleProgressClose.bind(this);
        this.handleProgressShow = this.handleProgressShow.bind(this);
        this.handleChangeStatusClose = this.handleChangeStatusClose.bind(this)
        this.handleChangeStatusShow = this.handleChangeStatusShow.bind(this)
    }

    handleProgressClose() {
        this.setState({ progressShow: false });
    }

    handleProgressShow() {
        this.setState({ progressShow: true });
    }

    handleChangeStatusClose() {
        this.setState({ changeStatusShow: false });
    }

    handleChangeStatusShow() {
        this.setState({ changeStatusShow: true });
    }

    componentDidMount() {

        const progress = this.convertDateObjects(this.props.progress)
        const lastActionDate = this.getLastActionDate(progress)
        const nextActionDate = this.getNextActionDate(lastActionDate)

        this.setState({
            progress,
            lastActionDate,
            nextActionDate,
        })
    }

    interviewUpcoming(interviews) {
        const lastInterview = interviews[interviews.length - 1]

        if (lastInterview.followups.length === 0) {
            const now = new Date()
            if (lastInterview.interaction <= now) {
                return lastInterview.interaction
            } 
        }
    }

    getLastActionDate(progress) {

        console.log(progress)
        
        let lastActionDate

        const state = progress.state

        if (state === 'applied' || state === 'callback' || state === 'interviewed') {

            let lastResponse

            if (state === 'applied') lastResponse = progress.applications[progress.applications.length - 1]
            if (state === 'callback') lastResponse = progress.callbacks[progress.callbacks.length - 1]
            if (state === 'interviewed') lastResponse = progress.interviews[progress.interviews.length - 1]

            lastActionDate =
                lastResponse.followups.length > 0 ?
                    lastResponse.followups[lastResponse.followups.length - 1] :
                    lastResponse.interaction

            console.log(lastActionDate)
        }
        return lastActionDate
    }

    getNextActionDate(lastActionDate) {

        let nextActionDate

        if (lastActionDate) {

            //Have to create new object or they will both have same ref
            nextActionDate = new Date(lastActionDate.getTime())
            nextActionDate.setDate(nextActionDate.getDate() + 7)

            //Do not return a number if date has passed
            const now = new Date()

            if (nextActionDate <= now) {
                return false
            }
            return nextActionDate
        }
    }

    convertDateObjects(appProgress) {
        // //Convert dates to JS Date objects
        for (let key in appProgress) {
            if (key !== 'state' && key !== '_id') {
                appProgress[key] = appProgress[key].map((property) => {
                    property.interaction = new Date(property.interaction)
                    property.followups = property.followups.map((followup) => {
                        return new Date(followup)
                    })
                    return property
                })
            }
        }
        return appProgress
    }

    async updateDatabase(progress) {

        console.log(progress)
        //Get jobApp from props
        const jobApp = this.props.jobApp

        //Add progress to jobApp
        jobApp.progress = progress

        //Add jobApp to user
        const user = this.props.user

        if (jobApp._id) {
            user.jobApps = user.jobApps.map(function (app) {
                if (app._id === jobApp._id) {
                    app = jobApp
                }
                return app
            })
        } else {
            user.jobApps.push(jobApp)
        }

        // Send to API with new data
        try {
            await axios.put(`/users/${this.props.user._id}/jobApp`, {
                user
            })
            this.props.handleClose()
            this.props.getUserData()
        } catch (e) {
            console.error(e)
        }
    }

    changeStatus(date) {

        console.log(date)

        //Get progress from state
        const progress = this.state.progress

        //Update progress
        progress.state = 'applied'

        const app = {}
        app.interaction = date
        progress.applications.push(app)

        this.updateDatabase(progress)
    }

    addFollowup(followup) {
        //Get Progress
        const progress = this.state.progress
        const state = progress.state
        let lastResponse

        if (state === 'applied') lastResponse = progress.applications[progress.applications.length - 1]
        if (state === 'callback') lastResponse = progress.callbacks[progress.callbacks.length - 1]
        if (state === 'interviewed') lastResponse = progress.interviews[progress.interviews.length - 1]

        //Add new followup to array
        lastResponse.followups.push(followup)
        //Change nextActionDate in state
        const lastActionDate = this.getLastActionDate(progress)
        const nextActionDate = this.getNextActionDate(lastActionDate)

        this.setState({
            nextActionDate,
            lastActionDate
        })

        //Update DB
        this.updateDatabase(progress)
    }

    responsePopup() {
        //Display popup to log response from employer (rejection, interview, acceptance)
    }

    render() {
        if (!this.state.progress) return <p>Data Missing</p>

        if (this.state.progress.state === 'unapplied') return (
                <>
                <Modal
                    show={this.state.changeStatusShow}
                    onHide={this.handleChangeStatusClose}
                >
                    <ChangeStatusPopup
                        handleChangeStatusClose={this.handleChangeStatusClose}
                        lastActionDate={this.state.lastActionDate}
                        getDateString={this.props.getDateString}
                        changeStatus={this.changeStatus}
                    ></ChangeStatusPopup>
                </Modal>
                <Table>
                    <thead>
                        <tr>
                            <th>Next Steps:</th>
                            <th>Hurry up and apply!</th>
                            <th><Button bsStyle="success" bsSize="small"
                                onClick={this.handleChangeStatusShow}>Done! What's next?</Button></th>
                        </tr>
                    </thead>
                </Table>
                </>
            )

        if (this.state.progress.state !== 'unapplied') return (
            <>
            <Modal
                show={this.state.progressShow}
                onHide={this.handleProgressClose}
            >
                <ProgressPopup
                    handleClose={this.handleProgressClose}
                    addFollowup={this.addFollowup}
                    lastActionDate={this.state.lastActionDate}
                    getDateString={this.props.getDateString}
                ></ProgressPopup>
            </Modal>
            <Table bordered responsive>
                <thead>
                    <tr>
                        <th>Next Steps:</th>
                        {this.state.progress.state === 'applied' && this.state.nextActionDate ? 
                            <>
                                <th>{`If you don't hear from a recruiter, send a followup email on ${this.props.getDateString(this.state.nextActionDate)}`}</th>
                                <th><Button bsStyle="success" bsSize="small">I heard back!</Button></th>
                            </>
                        : null}
                        {this.state.progress.state === 'applied' && !this.state.nextActionDate ? 
                            <>
                                <th>Haven't heard back? Send a followup email!</th>
                                <th><Button bsStyle="success" bsSize="small" onClick={this.handleProgressShow}>Done! What's next?</Button></th>
                            </>
                        : null}
                        {this.state.progress.state === 'callback' && this.state.nextActionDate ?
                            <>
                                <th>{`If you don't hear from them again soon, send a followup email on ${this.props.getDateString(this.state.nextActionDate)}`}</th>
                                    <th><Button bsStyle="success" bsSize="small">I heard back!</Button></th>
                            </>
                        : null}
                        {this.state.progress.state === 'callback' && !this.state.nextActionDate ?
                            <>
                                <th>Haven't heard back? Send a followup email!</th>
                                    <th><Button bsStyle="success" bsSize="small" onClick={this.handleProgressShow}>Done! What's next?</Button></th>
                            </>
                        : null}
                            {this.state.progress.state === 'interview' && this.state.nextActionDate && !this.state.interviewUpcoming ?
                            <>
                                <th>{`If you don't hear from them again soon, send a followup email on ${this.props.getDateString(this.state.nextActionDate)}`}</th>
                                    <th><Button bsStyle="success" bsSize="small" onClick={this.handleProgressShow}>I heard back!</Button></th>
                            </>
                        : null}
                        {this.state.progress.state === 'interview' && !this.state.nextActionDate && !this.state.interviewUpcoming ?
                            <>
                                <th>Haven't heard back? Send a followup email!</th>
                                <th><Button bsStyle="success" bsSize="small">Done! What's next?</Button></th>
                            </>
                        : null}
                            {this.state.progress.state === 'waitingForInterview' && this.stateNextAction ? 
                            <>
                                <th>{`You have an interview on ${this.props.getDateString(this.state.interviewUpcoming)}`}</th>
                            </>
                        : null}
                        {this.state.progress.state === 'waitingForInterview' && this.stateNextAction ?
                            <>
                                <th>How did your interview go?</th>
                                <th><Button bsStyle="success" bsSize="small">Tell us how it went!</Button></th>
                            </>
                        : null}
                    </tr>
                </thead>
            </Table>
            <Table bordered responsive key="key">
                <tbody>
                    {this.state.progress.applications.map((app, i) => {
                        const jsxObject = []

                        const interaction = (
                            <tr key={i}>
                                <th>Applied on:</th>
                                <th>{this.props.getDateString(app.interaction)}</th>
                                <th>[Check]</th>
                            </tr>
                        )

                        jsxObject.push(interaction)

                        const followups = app.followups ? app.followups.map((followup, j) => {
                            return (
                                <tr key={j}>
                                    <td>{`Followup #${j + 1} to application:`}</td>
                                    <td>{this.props.getDateString(followup)}</td>
                                    <td>[Check]</td>
                                </tr>
                            )
                        }) : null
                                                
                        jsxObject.push(followups)
                        
                        return jsxObject
                    })}
                    {this.state.progress.callbacks.map((callback, i) => {

                        const jsxObject = []

                        const interaction = (
                            <tr key={i}>
                                <th>Heard from them on:</th>
                                <th>{this.props.getDateString(callback.interaction)}</th>
                                <th>[Check]</th>
                            </tr>
                        )

                        jsxObject.push(interaction)

                        const followups = callback.followups ? callback.followups.map((followup, j) => {
                            return (
                                <tr key={j}>
                                    <td>{`Followup #${j + 1}:`}</td>
                                    <td>{this.props.getDateString(followup)}</td>
                                    <td>[Check]</td>
                                </tr>
                            )
                        }) :  null

                        jsxObject.push(followups)

                        return jsxObject
                    })}
                    {this.state.progress.interviews.map((interview, i) => {

                        const jsxObject = []

                        const interaction = (
                            <tr key={i}>
                                <th>Scheduled an interview on:</th>
                                <th>{this.props.getDateString(interview.interaction)}</th>
                                <th>[Check]</th>
                            </tr>
                        )

                        jsxObject.push(interaction)

                        const followups = interview.followups ? interview.followups.map((followup, j) => {
                            return (
                                <tr key={i}>
                                    <td>{`Followup #${j + 1} to interview:`}</td>
                                    <td>{this.props.getDateString(followup)}</td>
                                    <td>[Check]</td>
                                </tr>
                            )
                        }) :  null

                        jsxObject.push(followups)

                        return jsxObject
                    })}
                </tbody>
            </Table>
            </>
        )
    }
}