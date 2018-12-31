import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import EditJobApp from './EditJobApp'

export default class JobApp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: false,
            show: false
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    componentDidMount() {
        const appPropertiesArray = Object.keys(this.props.app)

        const appProperties = appPropertiesArray.map((property) => {
            const newObj = {
                [property]: this.props.app[property]
            }
            return newObj
        })

        this.setState({
            appProperties
        })

    }

    handleClick() {
        const expanded = !this.state.expanded

        this.setState({
            expanded
        })
    }

    render() {

        if (!this.props.app) return <tr><td>There are no apps here, dawg</td></tr>

        return (
            <>
            <tr>
                <td>{this.props.index + 1}</td>
                <td>{this.props.app.position}</td>
                <td>{this.props.app.company}</td>
                <td>Interview on January 5</td>
                <td><button onClick={this.handleClick}>{this.state.expanded ? "Collapse" : "Expand"}</button></td>
            </tr>
            {this.state.expanded 
                ? 
                    <tr>
                        <td></td>
                        <td colSpan="3">
                            <ul>
                                <li>Position: {this.props.app.position}</li>
                                {this.props.app.company ? 
                                    <li>Company: {this.props.app.company}</li>
                                :
                                    <li>Company: N/A</li>
                                }
                                {this.props.app.contactFirstName || this.props.contactLastName ?
                                    <li>Contact: {this.props.app.contactFirstName}</li>
                                    :
                                    <li>Contact Email: N/A</li>
                                }
                                {this.props.app.contactEmail ?
                                    <li>Contact Email: {this.props.app.contactEmail}</li>
                                    :
                                    <li>Contact Email: N/A</li>
                                }                               
                                {this.props.app.postingUrl ?
                                    <li>Job Posting: {this.props.app.postingUrl}</li>
                                    :
                                    <li>Job Posting: N/A</li>
                                }                               
                                {this.props.app.comments ?
                                    <li>Comments: {this.props.app.comments}</li>
                                    :
                                    <li>Comments: N/A</li>
                                }                               
                            </ul>
                            <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                                Edit application details
                            </Button>
                            <Modal
                                show={this.state.show}
                                onHide={this.handleClose}
                            >
                                <EditJobApp
                                    handleClose={this.handleClose}
                                    properties={this.props.app}
                                ></EditJobApp>
                            </Modal>
                        </td>
                    </tr> 
                : null
            }
            </>
        )
    }
}