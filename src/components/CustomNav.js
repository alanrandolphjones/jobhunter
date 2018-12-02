import React, { Component } from 'react'
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap'
import './CustomNav.css'

export default class CustomNav extends Component {
    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <h1>JobHunter</h1>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav pullRight>
                        <NavItem eventKey ={1} className="navbar-nav-item">
                            <Button>Sign Out</Button>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }
}