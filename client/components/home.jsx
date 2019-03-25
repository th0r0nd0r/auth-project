import React from 'react';
import SessionForm from './session_form';
import { BrowserRouter as Router, 
        Route, 
        Link, 
        withRouter } from "react-router-dom";
import { Redirect } from 'react-router';
import Dashboard from './dashboard';
import * as authUtils from '../utils/auth_api_utils';


// TODO: get loggedIn bool from server
let loggedIn = false;

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="bg">
          {/* <h1>React is up and running!</h1> */}
          <Route exact path="/" render={() => (
            !loggedIn ? (
              <Redirect to="/login"/>
            ) : (
              <Dashboard />
            )
          )}/>
          <Route path="/login" render={(props) => <SessionForm 
                                                    {...props} 
                                                    isLoginForm={true} 
                                                    submitUser={authUtils.loginUser} /> } />
          <Route path="/signup" render={(props) => <SessionForm 
                                                    {...props} 
                                                    isLoginForm={false} 
                                                    submitUser={authUtils.signupUser} /> } />
        </div>
      </Router>
    );
  }
}

export default Home;