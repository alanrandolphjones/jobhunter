import React, { Component } from 'react'
import { Table, Button, Modal } from 'react-bootstrap'
import EditJobApp from './EditJobApp'
import Progress from './Progress'
import axios from 'axios'

export default class JobApp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: false,
            show: false,
            appProperties: null,
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.deleteApp = this.deleteApp.bind(this)
    }

    componentWillReceiveProps = (newProps) => {
        const appProperties = this.getAppProperties(newProps.app)
        this.setState({
            appProperties
        })
    }

    async deleteApp() {

        const appId = this.props.app._id
        const user = this.props.user

        user.jobApps = user.jobApps.filter((app) => {
            return app._id !== appId
        })

        // Send to API with new data
        try {
            await axios.put(`/users/${this.props.user._id}/jobApp`, {
                user
            })
            this.props.getUserData(user._id)
        } catch (e) {
            console.error(e)
        }
        
    }

    handleClose() {
        if (this.state.show === true) this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    componentDidMount() {

        const appProperties = this.getAppProperties(this.props.app)
        
        this.setState({
            appProperties,
        })
        
    }

    getAppProperties(app) {
        const appPropertiesArray = Object.keys(app)

        const titles = {
            position: 'Position',
            company: 'Company',
            contactEmail: 'Contact Email',
            jobBoard: 'Job Board',
            postingUrl: 'Job Posting',
            postDate: 'Date Posted',
            comments: 'Comments',
        }
        const appProperties = appPropertiesArray.map((property) => {

            for (let title in titles) {
                if (title === property) {
                    let newObj = {
                        [property]: app[property],
                        title: titles[title],
                        input: property
                    }

                    if (property === 'postDate') {
                        const dateObj = new Date(newObj.postDate)
                        newObj.dateString = this.getDateString(dateObj)
                    }

                    return newObj
                }
            }
            let newObj = {
                [property]: app[property]
            }
            return newObj
        })

        return appProperties

    }

    getDateString(dateObj) {
        const month = dateObj.getMonth()
        const year = dateObj.getFullYear()
        const date = dateObj.getDate()

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        return `${months[month]} ${date}, ${year}`
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
                            <Table bordered responsive>
                                <tbody>
                                {
                                    this.state.appProperties.map((appProp, i) => {     
                                        if (appProp[appProp.input] && !appProp.postDate && !appProp.postingUrl && !appProp.contactEmail) {
                                            return (
                                                <tr key={i}>
                                                    <th>{appProp.title}:</th>
                                                    <th>{appProp[appProp.input]}</th>
                                                </tr>
                                            )
                                        }
                                        if (appProp.postDate) {
                                            return (
                                                <tr key={i}>
                                                    <th>{appProp.title}:</th>
                                                    <th>{appProp.dateString}</th>
                                                </tr>
                                            )
                                        }
                                        if (appProp.postingUrl) {
                                            return (
                                                <tr key={i}>
                                                    <th>{appProp.title}:</th>
                                                    <th><a href={appProp.postingUrl}>{appProp.postingUrl}</a></th>
                                                </tr>
                                            )
                                        }
                                        if (appProp.contactEmail) {
                                            return (
                                                <tr key={i}>
                                                    <th>{appProp.title}:</th>
                                                    <th><a href={`mailto:${appProp.contactEmail}`}>{appProp.contactEmail}</a></th>
                                                </tr>                                               
                                            )
                                        }
                                    })
                                }
                                <tr>
                                    <th colSpan="2">
                                            <Button bsStyle="primary" bsSize="small" onClick={this.handleShow}>
                                                Edit application details
                            </Button>
                                    </th>
                                </tr>
                                </tbody>
                            </Table>
                            <Modal
                                show={this.state.show}
                                onHide={this.handleClose}
                            >
                                <EditJobApp
                                    handleClose={this.handleClose}
                                    properties={this.props.app}
                                    user={this.props.user}
                                    getUserData={this.props.getUserData}
                                    getDateString={this.getDateString}
                                ></EditJobApp>
                            </Modal>
                            <Progress
                                progress={this.props.app.progress}
                                getDateString={this.getDateString}
                                handleClose={this.handleClose}
                                properties={this.props.app}
                                user={this.props.user}
                                getUserData={this.props.getUserData}
                                jobApp={this.props.app}
                            >
                            </Progress>

                            <Button bsStyle="danger" onClick={this.deleteApp}>
                                Delete this Application
                            </Button>
                        </td>
                    </tr> 
                : null
            }
            </>
        )
    }
}