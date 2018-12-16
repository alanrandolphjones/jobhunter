import React, { Component } from 'react'

export default class JobApp extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props)

        if (!this.props.app) return <tr><td>There are no apps here, dawg</td></tr>

        return (
            <tr>
                <td>1</td>
                <td>{this.props.app.position}</td>
                <td>{this.props.app.company}</td>
                <td>Interview on January 5</td>
                <td>Expand</td>
            </tr>
        )
    }
}