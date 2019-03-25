import React from 'react';
export default class SessionForm extends React.Component {
  constructor(props) {
    super(props);

    // TODO: use this.props.isLoginForm instead and link to new Route in toggleFormType
    this.state = {
      errors: {},
      userData: {
        name: "",
        email: "",
        password: "",
        password2: ""
      }
    };

    this.toggleFormType = this.toggleFormType.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleFormType() {
    const {isLoginForm, history} = this.props;

    if (isLoginForm) {
      history.push("/signup");
    } else {
      history.push("/login");
    }
  }

  handleInputChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleError(errors) {
    console.log("response errors: ", errors);
    this.setState({errors});
  }

  handleSubmit() {
    const {name, email, password, password2} = this.state;
    const {submitUser, history} = this.props;

    const user = {name, email, password, password2};

    submitUser(user, history, this.handleError);
  }

  componentDidUpdate() {
    console.log("new state: ", this.state);
  }

  // componentDidMount() {
  //   console.log("mounted");
  //   this.props.submitUser({
  //     name: "ricky",
  //     email: 'superduper@example.com',
  //     password: 'password',
  //     password2: 'password'
  //   }, history, this.handleError);
  // }

  render() {
    // console.log("session form props: ", this.props);
    // console.log("session form state: ", this.state);
    const {errors} = this.state;
    const {submitUser, isLoginForm} = this.props;

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
            <div className="form-group">
              {/* <label className="form-label" htmlFor="username">Username</label> */}
              <input onChange={this.handleInputChange} className={errors.name ? "form-input is-error" : "form-input"} type="text" id="name" placeholder="Username" />
              <p className="form-input-hint">{errors.name}</p>
            </div>
          }
          <div className="form-group">
            {/* <label className="form-label" htmlFor="email">Email</label> */}
            <input onChange={this.handleInputChange} className={errors.email ? "form-input is-error" : "form-input"} type="email" id="email" placeholder="Email" />
            <p className="form-input-hint">{errors.email}</p>
          </div>
          <div className="form-group">
            {/* <label className="form-label" htmlFor="password">Password</label> */}
            <input onChange={this.handleInputChange} className={errors.password ? "form-input is-error" : "form-input"} type="password" id="password" placeholder="Password" />
            <p className="form-input-hint">{errors.password}</p>
          </div>

          {!isLoginForm && 
            <div className="form-group">
              {/* <label className="form-label" htmlFor="confirm-password">Confirm Password</label> */}
              <input onChange={this.handleInputChange} className={errors.password2 ? "form-input is-error" : "form-input"} type="password" id="password2" placeholder="Confirm Password" />
              <p className="form-input-hint">{errors.password2}</p>
            </div>
          }
          <div>
            <button className="btn btn-primary submit-btn" onClick={this.handleSubmit}>
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