import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import axios from 'axios'
import CustomNav from './components/CustomNav'
import Home from './components/Home'

class App extends Component {
    constructor(props) {
      super(props)

      this.state = {
        user: null
      }
      this.getUserData = this.getUserData.bind(this)
    }

  getUserData = async () => {
    const res = await axios.get('/users')
    const user = res.data.data[1]
    console.log(user)
    this.setState({
      user
    })
  }

  componentDidMount = async () => {
    this.getUserData()
  }



  render() {

    return (
      <Router>
        <div className="App">

          <CustomNav />

          <Route 
            exact
            path="/" 
            render={ () => (
              this.state.user ?
                <Redirect 
                  to={`/user/${this.state.user.userName}`}
                />
              :
                <Redirect 
                  to="/login" 
                />
            )}
          />

          <Route 
            path="/user/:userId"
            render={ () => (
              this.state.user ?
                <Home
                  user={this.state.user}
                  getUserData={this.getUserData}
                />
              :
                <Redirect 
                  to="/login"
                />
            )}
          />

          <Route 
            path="/login"
            render={ () => (
              this.state.user ?
              <Redirect 
                to={`/user/${this.state.user.userName}`}
              />
            :
              <div>Login Screen</div> 
            )}
          />

        </div>

      </Router>
    );
    
  }
}

export default App;
