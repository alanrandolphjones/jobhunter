import React, { Component } from 'react'

const data = {
    array1: [
        "Active Job App 1",
        "Active Jib App 2",
        "Active Job App 3",
        "Active Jib App 4"
    ], 
    array2: [
        "Completed Job App 1",
        "Completed Jib App 2",
        "Completed Job App 3",
        "Completed Jib App 4"
    ]
}

export default class Spreadsheet extends Component {
    render() {
        return (
            <div>
                {data.array1.map((jobApp) => {
                    <p>{jobApp}</p>
                })}
            </div>
        )
    }
}