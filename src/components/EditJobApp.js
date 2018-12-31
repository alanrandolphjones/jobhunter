import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

export default class ComponentName extends Component {
    constructor(props) {
        super(props)

        this.state = {
            position: '',
            company: '',
            contactFirstName: '',
            contactLastName: '',
            contactEmail: '',
            jobBoard: '',
            postingUrl: '',
            postDate: '',
            comments: ''
        }

        this.handleChange = this.handleChange.bind(this)
        
    }

    componentDidMount() {
        console.log(this.props);
        
        if (this.props.properties) {
            console.log(this.props.properties);

            for (let property in this.props.properties) {
                console.log(property);
                
                this.setState({ [property]: this.props.properties[property]})
            }
        }
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }


    render() {
        return (
            <>
            <Modal.Header closeButton>
                <Modal.Title>Add a Job Application</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
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
                    <input type="submit" />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.handleClose}>Close</Button>
            </Modal.Footer>
            </>
        )
    }
}