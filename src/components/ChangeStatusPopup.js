import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

export default class ChangeStatusPopup extends Component {
    constructor() {
        super()

        this.state = {
            selectedDate: 0,
            dates: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.submitChange = this.submitChange.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    // getDiffDays(firstDate, secondDate) {

    //     console.log(firstDate, secondDate)

    //     var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    //     const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
    //     return diffDays
    // }

    componentDidMount() {

        const today = new Date()
        const dates = []

        for (let i = 7; i > 0; i--) {

            //Creating new Date object to prevent unintended modification of lastActionDay
            const steadyDate = new Date(today.getTime())
            const newDate = new Date(steadyDate.setDate(steadyDate.getDate() - i))
            
            dates.push(newDate)
        }

        const selectedDate = dates.length - 1


        this.setState({
            selectedDate,
            dates
        })

    }

    submitChange(e) {
        e.preventDefault()
        const changeDate = this.state.dates[this.state.selectedDate]
        this.props.changeStatus(changeDate)
        this.props.handleChangeStatusClose()
    }

    render() {
        return (
            <>
                <Modal.Header closeButton>
                    <Modal.Title>When did you apply?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>it's the right one</p>
                    <form onSubmit={this.submitChange}>
                        <select name="" id="selectedDate" value={this.state.selectedDate} onChange={this.handleChange}>
                            {this.state.dates.map((date, i) => {
                                return <option key={i} value={i}>{this.props.getDateString(date)}</option>
                            })}
                        </select>
                        <Button type="submit">Submit</Button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.handleChangeStatusClose}>Close</Button>
                </Modal.Footer>
            </>
        )
    }
}