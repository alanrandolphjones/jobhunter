import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import JobApp from './JobApp'

export default class Spreadsheet extends Component {
    constructor(props) {
        super(props)

    }

    render() {

        if (!this.props.apps) return <div>Loading!</div>
        console.log(this.props.apps)
        if (this.props.apps) return (
            <div>
                <Table bordered responsive >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Position</th>
                            <th>Employer</th>
                            <th>Next Steps</th>
                            <th>Expand</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.apps.map(function(app) {
                                return <JobApp app={app} />
                            })
                        }
                    </tbody>
                </Table>
                {this.props.apps.map( app => {
                    return JSON.stringify(app)
                })}
            </div>
        )
    }
}