import React from 'react';
import SessionForm from './session_form';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>React is up and running!</h1>
        <SessionForm />
      </div>
    );
  }
}