import React, { Component } from 'react'
import { Table, Button, Modal } from 'react-bootstrap'
import EditJobApp from './EditJobApp'
import Progress from './Progress'

export default class JobApp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: false,
            show: false,
            appProperties: null,
            // progress: null,
            // nextActionDate: ''
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        if (this.state.show === true) this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    componentDidMount() {

        const appProperties = this.getAppProperties()
        
        this.setState({
            appProperties,
        })
        
    }

    getAppProperties() {

        const appPropertiesArray = Object.keys(this.props.app)

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
                        [property]: this.props.app[property],
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
                [property]: this.props.app[property]
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
                                </tbody>
                            </Table>
                            <Button bsStyle="primary" bsSize="small" onClick={this.handleShow}>
                                Edit application details
                            </Button>
                            <Modal
                                show={this.state.show}
                                onHide={this.handleClose}
                            >
                                <EditJobApp
                                    handleClose={this.handleClose}
                                    properties={this.props.app}
                                    user={this.props.user}
                                    getUserData={this.props.getUserData}
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
                            <div>
                                <h3>What are your next steps?</h3>
                                <p>Followup with recruiter [one week from application date]</p>
                            </div>
                        </td>
                    </tr> 
                : null
            }
            </>
        )
    }
}