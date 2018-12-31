import React, { Component } from 'react'
import Spreadsheet from './Spreadsheet'
import { Grid, Tabs, Tab } from 'react-bootstrap'

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);
        this.changeTabs = this.changeTabs.bind(this)

        this.state = {
            key: 1,
            openTab: 'inProgress',
            apps: []
        };
    }

    componentDidMount = () => {
        const apps = this.changeTabs(this.state.openTab)

        this.setState({
            apps
        })
    }

    changeTabs = (openTab) => {
        let allApps = this.props.user.jobApps
        let apps = []
        allApps.forEach(app => {
            if (app.progress[0].state === openTab) apps.push(app)
        })

        return apps
    }

    handleSelect(key) {
        const openTab = key === 1
            ? 'inProgress'
            : 'completed'
        const apps = this.changeTabs(openTab)
        
        this.setState({ 
            apps,
            key, 
            openTab
        });
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
                    <Spreadsheet openTab={this.state.openTab} apps={this.state.apps}/>
                </Grid>
            </div>
        )
    }
}

