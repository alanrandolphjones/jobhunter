import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
// import axios from 'axios';

export default class EditProgress extends Component {
    constructor(props) {
        super(props)

        this.state = {
            interactions: null,
            status: null
        }

        this.handleChange = this.handleChange.bind(this)
        this.getDatesArray = this.getDatesArray.bind(this)
    }

    componentDidMount() {
        const interactions = this.props.interactions
        const status = this.props.status
        
        this.setState({
            interactions,
            status
        })
    }

    confirmStatus() {
        //After change has been submitted, check status and change if necessary
    }

    addNewInteraction() {

    }

    addFollowup() {

    }

    handleChange(event) {

        const interactions = this.state.interactions
        const name = event.target.name

        console.log(interactions)

        //For changes on the interaction kind
        if (name === "kind") {
            const key = event.target.id.split('_').pop()
            interactions[key][name] = event.target.value
        }

        if (name === "date") {
            const key = event.target.id.split('_').pop()
            interactions[key][name] = this.getDatesArray(interactions[key].date)[event.target.value]
        }

        if (name === 'followup') {
            const followupKey = event.target.id.split('_')[2]
            const interactionsKey = event.target.id.split('_')[1]
            console.log(interactionsKey, followupKey)
            interactions[interactionsKey].followups[followupKey] = this.getDatesArray(interactions[interactionsKey].followups[followupKey])[event.target.value]
        }

        console.log(interactions)

        //Make new func for changes on followups

        this.setState({ interactions });
    }

    getDatesArray(date) {

        console.log(date)

        const dates = []
        //90 day range before and after
        for (let i = -30; i < 60; i++) {

            //Creating new Date object to prevent unintended modification of date
            const steadyDate = new Date(date.getTime())
            const newDate = new Date(steadyDate.setDate(steadyDate.getDate() + i))

            dates.push(newDate)
        }
    
        return dates
    }

    async submitProgressChanges(e) {
        console.log(this.props.progress)
        // e.preventDefault()

        // const jobApp = this.state
        // const user = this.props.user

        // if (jobApp._id) {
        //     user.jobApps = user.jobApps.map(function (app) {
        //         if (app._id === jobApp._id) {
        //             app = jobApp
        //         }
        //         return app
        //     })
        // } else {
        //     user.jobApps.push(jobApp)
        // }

        // jobApp.progress.state = jobApp.progress.state ? jobApp.progress.state : 'applied'

        // try {
        //     await axios.put(`/users/${this.props.user._id}/jobApp`, {
        //         user
        //     })
        //     this.props.handleClose()
        //     this.props.getUserData()
        // } catch (e) {
        //     console.error(e)
        // }

    }


    render() {
        if (!this.state.interactions) return <p>Loading...</p>
        
        if (this.state.interactions) return (
            <>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Job Application Progress</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.submitProgressChanges}>

                        {this.state.interactions.map((interaction, i) => {

                            // let followupsJsx = interaction.followups ? interaction.followups.map((followup, j) => {
                            //     return (
                            //         <div className="followup" key={j}>
                            //             <label htmlFor="">Followup #{j}</label>
                            //             <select name="" id="">
                            //                 <option value="">1</option>
                            //                 <option value="">2</option>
                            //                 <option value="">3</option>
                            //             </select>
                            //         </div>
                            //     )
                            // }) : null

                            // Include new segment for date of interaction

                            return ( <div className="interaction" key={i}>
                                <label htmlFor="">Interaction with employer #{i}:</label>
                                <select name="kind" id={`kind_${i}`} value={interaction.kind} onChange={this.handleChange}>
                                    <option value="">Select one...</option>
                                    <option value="application">Application</option>
                                    <option value="callback">I heard back from them</option>
                                    <option value="interview">An interview</option>
                                </select>
                                <label htmlFor="">Date of interaction</label>
                                <select name="date" id={`date_${i}`} value="30" onChange={this.handleChange}>
                                    {this.getDatesArray(interaction.date).map((date, i) => {
                                        return <option key={i} value={i}>{this.props.getDateString(date)}</option>
                                    })}
                                </select>

                                {interaction.followups ? interaction.followups.map((followup, j) => {
                                    return (
                                        <div className="followup" key={j}>
                                            <label htmlFor="">Followup #{j} date</label>
                                            <select name="followup" id={`followup_${i}_${j}`} value="30" onChange={this.handleChange}>
                                                {this.getDatesArray(followup).map((date, k) => {
                                                    console.log()
                                                    return <option key={k} value={k}>{this.props.getDateString(date)}</option>
                                                })}
                                            </select>
                                        </div>
                                    )
                                }) : null}
                            </div>)
                            
                        })}


                        <Button type="submit">Submit</Button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.handleClose}>Close</Button>
                </Modal.Footer>
            </>
        )
    }
}