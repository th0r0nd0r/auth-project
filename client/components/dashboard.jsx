import React from 'react';

export default function Dashboard(props) {
  const {auth, logoutUser} = props;

  return (
    <div className="text-center text-column">
      <h1>Hi, {auth.currentUser.name}!</h1>
      <h2>So much room for activities</h2>
      <button className="btn btn-primary submit-btn col-4" onClick={logoutUser}>Log Out</button>
    </div>
  );
}