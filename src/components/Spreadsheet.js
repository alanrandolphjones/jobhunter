import React, { Component } from 'react'

export default class Spreadsheet extends Component {

    render() {
        return (
            <div>
                {JSON.stringify(this.props.apps)}
            </div>
        )
    }
}