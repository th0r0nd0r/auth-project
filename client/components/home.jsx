import React from 'react';
import SessionForm from './session_form';
import { BrowserRouter as Router, 
        Route, 
        Link, 
        withRouter } from "react-router-dom";
import { Redirect } from 'react-router';
import Dashboard from './dashboard';
import {loginUser, signupUser, logoutUser} from '../utils/auth_api_utils';
import isEmpty from 'is-empty';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/authToken';
import ProtectedRoute from '../custom_routes/ProtectedRoute';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      loggedIn: false,
    };

    this.setCurrentUser = this.setCurrentUser.bind(this);
  }

  setCurrentUser(currentUser) {
    this.setState({
      currentUser, 
      loggedIn: !isEmpty(currentUser)
    });
  }

  componentDidUpdate() {
    console.log("global state; ", this.state);
  }

  componentDidMount() {
    console.log("global state; ", this.state);    
    // Check for token to keep user logged in
    if (localStorage.jwtToken) {
      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      this.setCurrentUser(decoded);
    // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {
        // Logout user
        logoutUser(this.setCurrentUser);
        // Redirect to login
        window.location.href = "./login";
      }
    }
  }

  render() {
    const {currentUser, loggedIn} = this.state;
    const authProps = {currentUser, loggedIn};

    return (
      <Router>
        <div className="bg">
          {/* <h1>React is up and running!</h1> */}
          <Route exact path="/" render={() => (
            loggedIn ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/signup"/>
            )
          )}/>
          <Route path="/login" render={(props) => <SessionForm 
                                                    {...props} 
                                                    isLoginForm={true} 
                                                    submitUser={loginUser}
                                                    auth={authProps}
                                                    setCurrentUser={this.setCurrentUser}
                                                     /> } />
          <Route path="/signup" render={(props) => <SessionForm 
                                                    {...props} 
                                                    isLoginForm={false} 
                                                    submitUser={signupUser} 
                                                    auth={authProps}
                                                    setCurrentUser={this.setCurrentUser}
                                                    /> } />
          <Route path="/dashboard" render={(props) => 
                                              loggedIn ? (
                                                <Dashboard 
                                                  auth={authProps} 
                                                  logoutUser={() => logoutUser(this.setCurrentUser)}
                                                  />  
                                              ) : (
                                                <Redirect to="/login" />
                                              )} />
        </div>
      </Router>
    );
  }
}

export default Home;