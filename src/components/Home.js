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
        const apps = this.changeTabs(this.state.openTab, this.props.user)

        this.setState({
            apps
        })
    }

    componentWillReceiveProps = (newProps) => {
        const apps = this.changeTabs(this.state.openTab, newProps.user)

        this.setState({
            apps
        })
    }
    changeTabs = (openTab, user) => {
        let allApps = user.jobApps
        let apps = []
        if (openTab === 'completed') {
            allApps.forEach(app => {            
                if (app.progress.state === openTab) apps.push(app)
            })
        } else {
            allApps.forEach(app => {
                console.log(app)
                if (app.progress.state !== 'completed') apps.push(app)
            })
        }

        return apps
    }

    handleSelect(key) {
        const openTab = key === 1
            ? 'inProgress'
            : 'completed'


        const apps = this.changeTabs(openTab, this.props.user)
        
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
                    <Spreadsheet 
                        openTab={this.state.openTab} 
                        apps={this.state.apps} 
                        user={this.props.user}
                        getUserData={this.props.getUserData}
                    />
                </Grid>
            </div>
        )
    }
}

