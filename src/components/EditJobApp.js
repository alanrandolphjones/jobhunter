import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios';

export default class ComponentName extends Component {
    constructor(props) {
        super(props)

        this.state = {
            _id: '',
            position: '',
            company: '',
            contactFirstName: '',
            contactLastName: '',
            contactEmail: '',
            jobBoard: '',
            postingUrl: '',
            postDate: new Date(),
            comments: '',
            progress: {}
        }

        this.handleChange = this.handleChange.bind(this)
        this.submitNewJobDetails = this.submitNewJobDetails.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount() {      
        if (this.props.properties) {
            console.log(this)
            for (let property in this.props.properties) {                
                this.setState({ [property]: this.props.properties[property]})
            }
        }
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    async submitNewJobDetails(e) {
        e.preventDefault()

        const jobApp = this.state
        const user = this.props.user

        if (jobApp._id) {
            user.jobApps = user.jobApps.map(function(app) {
                console.log(app._id)
                console.log(jobApp._id)
                if (app._id === jobApp._id) {
                    app = jobApp
                }
                return app
            })
            console.log(user)
        } else {
            user.jobApps.push(jobApp)
        }

        jobApp.progress.state = jobApp.progress.state ? jobApp.progress.state : 'applied'

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


    render() {
        return (
            <>
            <Modal.Header closeButton>
                <Modal.Title>Add a Job Application</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <form onSubmit={this.submitNewJobDetails}>
                    <div>
                        <label htmlFor="position">Position:</label>
                        <input type="text" id="position" value={this.state.position} onChange={this.handleChange}/>
                    </div>                    
                    <div>
                        <label htmlFor="company">Company:</label>
                        <input type="text" id="company" value={this.state.company} onChange={this.handleChange}/>
                    </div>    
                    <div>
                        <label htmlFor="contactFirstName">Contact First Name:</label>
                            <input type="text" id="contactFirstName" value={this.state.contactFirstName} onChange={this.handleChange}/>
                    </div>       
                    <div>
                        <label htmlFor="contactLastName">Contact First Name:</label>
                            <input type="text" id="contactLastName" value={this.state.contactLastName} onChange={this.handleChange}/>
                    </div>                         
                    <div>
                        <label htmlFor="contactEmail">Contact Email:</label>
                            <input type="text" id="contactEmail" value={this.state.contactEmail} onChange={this.handleChange}/>
                    </div>                    
                    <div>
                        <label htmlFor="jobBoard">Job Board:</label>
                            <input type="text" id="jobBoard" value={this.state.jobBoard} onChange={this.handleChange}/>
                    </div>                    
                    <div>
                        <label htmlFor="postingUrl">Job Posting:</label>
                            <input type="text" id="postingUrl" value={this.state.postingUrl} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="postDate">Date Posted:</label>
                            <input type="text" id="postDate" value={this.state.postDate} onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="comments">Comments:</label>
                            <textarea type="text" id="comments" value={this.state.comments} onChange={this.handleChange}></textarea>
                    </div>
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