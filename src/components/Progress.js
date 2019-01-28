import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'

export default class Progress extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            progress:null
        }
    }

    componentDidMount() {

        const progress = this.convertDateObjects(this.props.progress)
        this.setState({
            progress
        })
    }

    getNextActionDate(progress) {
        let nextActionDate
        let lastActionDate

        if (progress.state === 'applied') {
            lastActionDate =
                progress.applicationFollowups.length === 0 ?
                    progress.applicationDate :
                    progress.applicationFollowups[progress.applicationFollowups.length - 1]
        }

        if (progress.state === 'callback') {
            lastActionDate =
                progress.callbackFollowups.length === 0 ?
                    progress.callback.date :
                    progress.callbackFollowups[progress.callbackFollowups.length - 1]
        }

        if (progress.state === 'interviewed') {
            lastActionDate =
                progress.interviewFollowups.length === 0 ?
                    progress.interview[progress.interview.length - 1] :
                    progress.interviewFollowups[progress.interviewFollowups.length - 1]
        }

        if (lastActionDate) {
            nextActionDate = new Date()
            nextActionDate.setDate(lastActionDate.getDate() + 7)
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



    render() {
        if (!this.state.progress) return <p>Data Missing</p>
        return (
            <Table bordered responsive>
                <thead>
                    <tr>
                        <th colSpan="3">What are your next steps?</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.progress.state === 'unapplied' ?
                        <tr>
                            <th colSpan="2">What are you waiting for? Apply!</th>
                            <th>
                                <Button bsStyle="success" bsSize="small">Done! What's next?</Button>
                            </th>
                        </tr>
                        : null}
                    {this.state.progress.applications.map((app) => {

                        const jsxObject = []

                        const interaction = (
                            <tr>
                                <th>Applied on:</th>
                                <th>{this.props.getDateString(app.interaction)}</th>
                                <th>[Check]</th>
                            </tr>
                        )

                        jsxObject.push(interaction)

                        const followups = app.followups.map((followup, i) => {
                            return (
                                <tr key={i}>
                                    <th>{`Followup #${i + 1} to application:`}</th>
                                    <th>{this.props.getDateString(followup)}</th>
                                    <th>[Check]</th>
                                </tr>
                            )
                        })

                        jsxObject.push(followups)
                        
                        return jsxObject
                    })}
                    {this.state.progress.callbacks.map((callback) => {

                        const jsxObject = []

                        const interaction = (
                            <tr>
                                <th>Heard from them on:</th>
                                <th>{this.props.getDateString(callback.interaction)}</th>
                                <th>[Check]</th>
                            </tr>
                        )

                        jsxObject.push(interaction)

                        const followups = callback.followups.map((followup, i) => {
                            return (
                                <tr key={i}>
                                    <th>{`Followup #${i + 1}:`}</th>
                                    <th>{this.props.getDateString(followup)}</th>
                                    <th>[Check]</th>
                                </tr>
                            )
                        })

                        jsxObject.push(followups)

                        return jsxObject
                    })}
                    {this.state.progress.interviews.map((interview) => {

                        const jsxObject = []

                        const interaction = (
                            <tr>
                                <th>Scheduled an interview on:</th>
                                <th>{this.props.getDateString(interview.interaction)}</th>
                                <th>[Check]</th>
                            </tr>
                        )

                        jsxObject.push(interaction)

                        const followups = interview.followups.map((followup, i) => {
                            return (
                                <tr key={i}>
                                    <th>{`Followup #${i + 1} to interview:`}</th>
                                    <th>{this.props.getDateString(followup)}</th>
                                    <th>[Check]</th>
                                </tr>
                            )
                        })

                        jsxObject.push(followups)

                        return jsxObject
                    })}
                </tbody>
            </Table>
        )
    }
}