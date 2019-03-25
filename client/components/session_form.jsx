import React from 'react';
export default class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    // TODO: use this.props.isLoginForm instead and link to new Route in toggleFormType
    this.state = {
      isLoginForm: true,
      errors: {},
      name: "",
      email: "",
      password: "",
      password2: ""
    };

    this.toggleFormType = this.toggleFormType.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  toggleFormType() {
    this.setState({isLoginForm: !this.state.isLoginForm});
  }

  handleInputChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleError(errors) {
    console.log("response errors: ", errors);
    this.setState({errors});
  }

  componentDidMount() {
    console.log("mounted");
    this.props.submitUser({
      name: "ricky",
      email: 'superduper@example.com',
      password: 'password',
      password2: 'password'
    }, history, this.handleError);
  }

  render() {
    console.log("session form props: ", this.props);
    console.log("session form state: ", this.state);
    const {isLoginForm, errors} = this.state;

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
              <input onChange={this.handleInputChange} error={errors.name} className="form-input" type="text" id="name" placeholder="Username" />
            </div>
          }
          <div className="input-group">
            {/* <label className="form-label" htmlFor="email">Email</label> */}
            <input onChange={this.handleInputChange} error={errors.email} className="form-input" type="email" id="email" placeholder="Email" />
          </div>
          <div className="input-group">
            {/* <label className="form-label" htmlFor="password">Password</label> */}
            <input onChange={this.handleInputChange} error={errors.password} className="form-input" type="password" id="password" placeholder="Password" />
          </div>

          {!isLoginForm && 
            <div className="input-group">
              {/* <label className="form-label" htmlFor="confirm-password">Confirm Password</label> */}
              <input onChange={this.handleInputChange} error={errors.password2} className="form-input" type="password" id="password2" placeholder="Confirm Password" />
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