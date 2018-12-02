import React, { Component } from 'react'
import Spreadsheet from './Spreadsheet'
import { Grid, Tabs, Tab } from 'react-bootstrap'
import axios from 'axios'
// import { CLIENT_RENEG_LIMIT } from 'tls';

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleSelect = this.handleSelect.bind(this);

        this.state = {
            key: 1,
            openTab: 'inProgress',
            allApps: null,
            appsInUse: null
        };
    }

        //I need a URL that will grant me all the job apps of ONE user, using user id as a string

    getApps = async () => {
        const res = await axios.get('/jobApps')
        const allApps = res.data.data
        
        return allApps

    }

    componentDidMount = async () => {
        const allApps = await this.getApps()

        const appsInUse = this.getAppsInUse(allApps, this.state.openTab)
    
        this.setState({
            allApps,
            appsInUse
        })
    }

    getAppsInUse = (allApps, openTab) => {

        const appsInUse = allApps.filter(app => {
            return app.progress[0].state === openTab
        })

        return appsInUse
    }

    handleSelect(key) {
        const openTab = key === 1 
            ? 'inProgress' 
            : 'completed'

        const appsInUse = this.getAppsInUse(this.state.allApps, openTab)

        this.setState({ 
            key, 
            openTab,
            appsInUse
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
                    <Spreadsheet openTab={this.state.openTab} user={this.props.user} apps={this.state.appsInUse}/>
                </Grid>
            </div>
        )
    }
}

