import React from 'react';

export default class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    // TODO: use this.props.isLoginForm instead and link to new Route in toggleFormType
    this.state = {
      isLoginForm: true,
    };

    this.toggleFormType = this.toggleFormType.bind(this);
  }

  toggleFormType() {
    this.setState({isLoginForm: !this.state.isLoginForm});
  }

  render() {
    const {isLoginForm} = this.state;
    let btnText, altText;
    if (isLoginForm) {
      btnText = "Log In";
      altText = "Sign Up";
    } else {
      btnText = "Sign Up";
      altText = "Log In";
    }

    return (
      <div className="card col-4 col-mx-auto mt-50">
        <div className="form">
          <div className="text-center">
            <h2>Welcome to the app!</h2>
          </div>

          {!isLoginForm && 
            <div className="input-group">
              {/* <label className="form-label" htmlFor="username">Username</label> */}
              <input className="form-input" type="text" id="username" placeholder="Username" />
            </div>
          }
          <div className="input-group">
            {/* <label className="form-label" htmlFor="email">Email</label> */}
            <input className="form-input" type="text" id="email" placeholder="Email" />
          </div>
          <div className="input-group">
            {/* <label className="form-label" htmlFor="password">Password</label> */}
            <input className="form-input" type="password" id="password" placeholder="Password" />
          </div>

          {!isLoginForm && 
            <div className="input-group">
              {/* <label className="form-label" htmlFor="confirm-password">Confirm Password</label> */}
              <input className="form-input" type="password" id="confirm-password" placeholder="Confirm Password" />
            </div>
          }
          <div>
            <button className="btn btn-primary submit-btn" onClick={() => console.log("button clicked")}>
              {btnText}
            </button>
            <div className="text-center">
              or <span className="ul-hover" onClick={this.toggleFormType}>{altText}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}