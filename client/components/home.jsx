import React from 'react';
import SessionForm from './session_form';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect } from 'react-router';
import Dashboard from './dashboard';


// TODO: get loggedIn bool from server
let loggedIn = false;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div>
          {/* <h1>React is up and running!</h1> */}
          <Route exact path="/" render={() => (
            !loggedIn ? (
              <Redirect to="/login"/>
            ) : (
              <Dashboard />
            )
          )}/>
          <Route path="/login" render={(props) => <SessionForm {...props} newUser={false} />} />
          <Route path="/signup" render={(props) => <SessionForm {...props} newUser={true} />} />
        </div>
      </Router>
    );
  }
}