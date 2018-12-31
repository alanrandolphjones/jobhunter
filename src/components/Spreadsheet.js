import React, { Component } from 'react'
import { Table, Button, Modal } from 'react-bootstrap'
import JobApp from './JobApp'
import EditJobApp from './EditJobApp'

export default class Spreadsheet extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {        
        this.setState({ show: true });
    }

    render() {

        if (!this.props.apps) return <div>Loading!</div>
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
                            this.props.apps.map(function(app, i) {
                                return <JobApp app={app} key={app._id} index={i}/>
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th colSpan="3">
                                <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
                                    Add job application
                                </Button>
                            </th>
                            <th></th>
                        </tr>
                    </tfoot>
                </Table>
                <Modal 
                    show={this.state.show} 
                    onHide={this.handleClose}
                >
                    <EditJobApp
                        handleClose={this.handleClose}
                    ></EditJobApp>
                </Modal>
            </div>
        )
    }
}