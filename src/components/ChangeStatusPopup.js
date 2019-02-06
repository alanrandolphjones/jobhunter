import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

export default class ChangeStatusPopup extends Component {
    constructor() {
        super()

        this.state = {
            selectedDate: 0,
            dates: [],
            selectedInterviewDate: 0,
            interviewDates: [],
            interactionType: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.submitChange = this.submitChange.bind(this)
        this.unappliedToApplied = this.unappliedToApplied.bind(this)
        this.appliedToInterview = this. appliedToInterview.bind(this)
        this.appliedToCallback = this.appliedToCallback.bind(this)
        this.appliedToKeepInTouch = this.appliedToKeepInTouch.bind(this)
        this.setInterviewDate = this.setInterviewDate.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    componentDidMount() {

        console.log('mounted')

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

    unappliedToApplied(e) {
        e.preventDefault()
        const date = this.state.dates[this.state.selectedDate]
        this.submitChange(date, 'applications', 'applied')
    }

    appliedToInterview() {
        console.log('applied to intervire')
        const date = this.state.dates[this.state.selectedDate]
        this.props.addInteraction(date, 'callbacks', 'callback')

        const today = new Date()
        const interviewDates = []

        for (let i = 0; i < 30; i++) {

            //Creating new Date object to prevent unintended modification of lastActionDay
            const steadyDate = new Date(today.getTime())
            const newDate = new Date(steadyDate.setDate(steadyDate.getDate() + i))

            interviewDates.push(newDate)
        }

        const selectedInterviewDate = 0

        this.setState({
            interactionType: 'interviews',
            interviewDates,
            selectedInterviewDate
        })
    }

    setInterviewDate(e) {
        e.preventDefault()
        const interviewDate = this.state.interviewDates[this.state.selectedInterviewDate]
        this.submitChange(interviewDate, 'interviews', 'waitingForInterview')
    }

    appliedToCallback(e) {
        e.preventDefault()
        const date = this.state.dates[this.state.selectedDate]
        this.submitChange(date, 'callbacks', 'callback')
    }

    appliedToKeepInTouch(e) {
        e.preventDefault()
        const date = this.state.dates[this.state.selectedDate]
        this.submitChange(date, 'callbacks', 'keepInTouch')        
    }

    submitChange(date, interactionType, newStatus) {
        this.props.addInteraction(date, interactionType, newStatus)
        this.props.handleChangeStatusClose()
    }

    render() {

        if (this.props.state === 'unapplied') return (
            <>
                <Modal.Header closeButton>
                    <Modal.Title>When did you apply?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.unappliedToApplied}>
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

        if (this.props.state === 'applied' && this.state.interactionType !== 'interviews') return (
            <>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title>When did you hear back?</Modal.Title>
                        <div>
                            <select name="" id="selectedDate" value={this.state.selectedDate} onChange={this.handleChange}>
                                {this.state.dates.map((date, i) => {
                                    return <option key={i} value={i}>{this.props.getDateString(date)}</option>
                                })}
                            </select>
                        </div>
                    <Modal.Title>What did they say?</Modal.Title>                    
                        <Button type="submit" bsStyle="success" onClick={this.appliedToInterview}>I got an interview!</Button>
                        <Button type="submit" bsStyle="danger" onClick={this.appliedToKeepInTouch}>I didn't get the job</Button>
                        <Button type="submit" bsStyle="warning" onClick={this.appliedToCallback}>They'll reach out again soon</Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.handleChangeStatusClose}>Close</Button>
                </Modal.Footer>
            </>
        )

        if (this.props.state === 'applied' && this.state.interactionType === 'interviews') return (
            <>
            <Modal.Header closeButton>
                <Modal.Title>When is the interview?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={this.setInterviewDate}>
                    <select name="" id="selectedInterviewDate" value={this.state.selectedInterviewDate} onChange={this.handleChange}>
                        {this.state.interviewDates.map((date, i) => {
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

        return null

    }
}