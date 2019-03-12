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
        user: null,
      }
      this.getUserData = this.getUserData.bind(this)
    }

  //Pulls in user data and sets in state
  getUserData = async (id) => {
    const res = await axios.get(`/users/${id}`)
    const user = res.data.data[0]
    this.setState({
      user
    })
  }

  //For demo purposes, this will create an account for new visitors using this model. Will delete once I add account-based login functionality
  createUserForDemo = async () => {
    const user = {
      firstName: 'User',
      lastName: 'At Large',
      userName: 'user_atlarge',
      password: 'password',
      email: 'user@useremail.com',
      jobApps: [
        {
          position: "Front End Developer",
          company: "Very Cool Startup",
          contactEmail: "recruiter@coolstartup.com",
          contactFirstName: "Sparky",
          contactLastName: "Zuckerberg",
          progress: {
            status: 'applied',
            interactions: [
              {
                kind: 'application',
                date: new Date('March 1 2019'),
                followups: [
                  new Date("March 7 2019")
                ]
              }
            ]
          }
        },
        {
          position: "Web Developer",
          company: "Big Tech Giant",
          contactEmail: "recruiter@bigtech.com",
          contactFirstName: "Bill",
          contactLastName: "Gates",
          postDate: new Date('February 20 2019'),
          progress: {
            status: 'waitingForInterview',
            interactions: [
              {
                kind: 'application',
                date: new Date('February 23 2019'),
                followups: [
                  new Date("March 1 2019"),
                  new Date("March 7 2019"),
                  new Date("March 14 2019")
                ]
              },
              {
                kind: 'callback',
                date: new Date('March 15 2019'),
              },
              {
                kind: 'interview',
                date: new Date('April 5 2019'),
              }
            ]
          }
        },
        {
          position: "Full Stack Developer",
          company: "Exciting Enterprise",
          contactEmail: "jerry@enterprise.co",
          contactFirstName: "Jerry",
          contactLastName: "Enterprise",
          postDate: new Date('November 1, 2018'),
          progress: {
            status: 'interview',
            interactions: [
              {
                kind: 'application',
                date: new Date('January 23 2019'),
                followups: [
                  new Date("February 1 2019"),
                  new Date("February 7 2019"),
                  new Date("February 14 2019")
                ]
              },
              {
                kind: 'callback',
                date: new Date('February 20 2019'),
              },
              {
                kind: 'interview',
                date: new Date('March 1 2019'),
                followups: [
                  new Date("March 8 2019"),
                  new Date("March 15 2019")
                ]
              }
            ]
          }
        },
        {
          position: "Another Developer Position",
          company: "Another Startup",
          contactEmail: "recruiter@anotherstartup.com",
          contactFirstName: "Jim",
          contactLastName: "Zuckerberg",
          progress: {
            status: 'rejected',
            interactions: [
              {
                kind: 'application',
                date: new Date('January 5 2019'),
                followups: [
                  new Date("January 12 2019"),
                  new Date("January 19 2019"),
                  new Date("January 26 2019")
                ]
              }
            ]
          }
        },
        {
          position: "Back End Developer",
          company: "Another Tech Firm",
          contactEmail: "recruiter@techfirm.com",
          contactFirstName: "Bob",
          contactLastName: "Gates",
          postDate: new Date('February 1 2019'),
          progress: {
            status: 'keepInTouch',
            interactions: [
              {
                kind: 'application',
                date: new Date('February 23 2019'),
                followups: [
                  new Date("March 1 2019"),
                  new Date("March 7 2019"),
                  new Date("March 14 2019")
                ]
              },
              {
                kind: 'callback',
                date: new Date('March 15 2019'),
              }
            ]
          }
        },
        {
          position: "Dream Job",
          company: "Cool Company",
          contactEmail: "jerry@cool.co",
          contactFirstName: "Very",
          contactLastName: "Cool",
          postDate: new Date('November 1, 2018'),
          progress: {
            status: 'accepted',
            interactions: [
              {
                kind: 'application',
                date: new Date('February 1 2019'),
                followups: [
                  new Date("February 8 2019"),
                ]
              },
              {
                kind: 'callback',
                date: new Date('February 13 2019'),
              },
              {
                kind: 'interview',
                date: new Date('March 8 2019'),
                followups: [
                  new Date("March 15 2019")
                ]
              }
            ]
          }
        }
      ]
    }

    //Posting demo user to database
    try {
      axios.post('/users', {
        user
      }).then((res) => {
        const demoUserId = res.data.data[0]._id
        //Loading new data, which will trigger a login into demo user account
        window.localStorage.setItem('jobhunterId', demoUserId)
        this.getUserData(demoUserId)
      })
    } catch (e) {
      console.error(e)
    }

  }

  componentDidMount = async () => {
    const jobhunterId = window.localStorage.getItem('jobhunterId')

    if (jobhunterId) {
      await this.getUserData(jobhunterId)
    } else {
      await this.createUserForDemo()
    }

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
