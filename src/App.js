import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import CustomNav from './components/CustomNav'
import Home from './components/Home'

class App extends Component {
  componentDidMount() {
    axios
      .get('/healthcheck')
      .then(res => {
        //Response from the API
        console.log(res)
      })
      .catch(err => {
        console.log(err);
        
      })

  }

  render() {
    return (
      <div className="App">
        <CustomNav />
        <Home />
      </div>
    );
    
  }
}

export default App;
