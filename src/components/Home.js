import React, { Component } from 'react'
import Spreadsheet from './Spreadsheet'
import { Grid, Tabs, Tab } from 'react-bootstrap'

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            key: 2,
        };
    }

    handleSelect(key) {
        this.setState({ key });
    }
    render() {
        return (
            <div>
                <Grid>
                    <Tabs 
                        id="spreadsheet-tabs"
                        activeKey={this.state.key}
                        onSelect={this.handleSelect}
                    >
                        <Tab eventKey={1} title="In Progress"></Tab>
                        <Tab eventKey={2} title="Completed"></Tab>
                    </Tabs>
                    <Spreadsheet openTab={this.state.key} />
                </Grid>
            </div>
        )
    }
}

