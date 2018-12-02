import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import CustomNav from './components/CustomNav'
import Home from './components/Home'

class App extends Component {
    state = {
      user: null
    }

  login = async () => {
    const res = await axios.get('/users')
    return res.data.data[1]
  }

  componentDidMount = async () => {
    const user = await this.login()
    this.setState({
      user
    })
  }

  render() {
    return (
      <div className="App">
        <CustomNav />
        <Home user={this.state.user} />
      </div>
    );
    
  }
}

export default App;
