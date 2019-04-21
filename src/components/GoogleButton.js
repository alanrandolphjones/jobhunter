import React, { Component } from 'react'

const GOOGLE_BUTTON_ID = 'google-sign-in-button';


export default class CustomNav extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount = () => {

        window.gapi.signin2.render(
            GOOGLE_BUTTON_ID,
            {
                width: 200,
                height: 50,
                onsuccess: this.props.onSuccess,
            },
        );

    }

    render() {
        return (
            <div id={GOOGLE_BUTTON_ID} />
        )
    }
}

