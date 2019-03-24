import React from 'react';

export default class SessionForm extends React.Component {
  constructor(props) {
    super(props);

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
      <div className="card col-4 col-mx-auto">
        <div className="form-group form">
          <label className="form-label" htmlFor="input-example-1">Name</label>
          <input className="form-input" type="text" id="input-example-1" placeholder="Name" />
          <label className="form-label" htmlFor="input-example-1">Email</label>
          <input className="form-input" type="text" id="input-example-1" placeholder="Email" />
          <div>
            <button className="btn btn-primary submit-btn col-3" onClick={() => console.log("button clicked")}>
              {btnText}
            </button>
            or <span className="ul-hover" onClick={this.toggleFormType}>{altText}</span>
          </div>
        </div>
      </div>
    );
  }
}