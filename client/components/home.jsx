import React from 'react';
import SessionForm from './session_form';
import { BrowserRouter as Router, 
        Route, 
        Link, 
        withRouter } from "react-router-dom";
import { Redirect } from 'react-router';
import Dashboard from './dashboard';
import * as authUtils from '../utils/auth_api_utils';
import isEmpty from 'is-empty';


// TODO: get loggedIn bool from server
let loggedIn = false;

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      isAuthenticated: false,
      errors: {}
    };

    this.setCurrentUser = this.setCurrentUser.bind(this);
    this.setErrors = this.setErrors.bind(this);
  }

  setCurrentUser(currentUser) {
    this.setState({
      currentUser, 
      isAuthenticated: !isEmpty(currentUser)
    });
  }

  // setErrors(errors) {
  //   this.setState({errors});
  // }

  render() {
    const {currentUser} = this.state;

    return (
      <Router>
        <div className="bg">
          {/* <h1>React is up and running!</h1> */}
          <Route exact path="/" render={() => (
            !loggedIn ? (
              <Redirect to="/signup"/>
            ) : (
              <Dashboard currentUser={currentUser}/>
            )
          )}/>
          <Route path="/login" render={(props) => <SessionForm 
                                                    {...props} 
                                                    isLoginForm={true} 
                                                    submitUser={authUtils.loginUser}
                                                    currentUser={currentUser}
                                                    setCurrentUser={this.setCurrentUser}
                                                    // setErrors={this.setErrors}
                                                     /> } />
          <Route path="/signup" render={(props) => <SessionForm 
                                                    {...props} 
                                                    isLoginForm={false} 
                                                    submitUser={authUtils.signupUser} 
                                                    currentUser={currentUser}
                                                    setCurrentUser={this.setCurrentUser}
                                                    // setErrors={this.setErrors}
                                                    /> } />
        </div>
      </Router>
    );
  }
}

export default Home;