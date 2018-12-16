import React, { Component } from 'react'

export default class JobApp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: false,
        }

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        const appPropertiesArray = Object.keys(this.props.app)

        const appProperties = appPropertiesArray.map((property) => {
            const newObj = {
                [property]: this.props.app[property]
            }
            console.log(newObj)
            return newObj
        })

        console.log(appProperties)

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
                                }                               {this.props.app.postingUrl ?
                                    <li>Job Posting: {this.props.app.postingUrl}</li>
                                    :
                                    <li>Job Posting: N/A</li>
                                }                               {this.props.app.comments ?
                                    <li>Comments: {this.props.app.comments}</li>
                                    :
                                    <li>Comments: N/A</li>
                                }                               
                            </ul>
                        </td>
                    </tr> 
                : null
            }
            </>
        )
    }
}