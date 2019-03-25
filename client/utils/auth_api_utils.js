import setAuthToken from './authToken';
import jwt_decode from 'jwt-decode';
import axios from './axiosSetup';

// set defaults for options objects
const defaults = {
  userData: {},
  handleError: (err) => console.log(err.response.data),
};

export const signupUser = (options) => {
  const {userData, history, handleError, setCurrentUser} = Object.assign({}, defaults, options);

  axios
    .post("/auth/signup", userData)
    .then(res => loginUser({userData, setCurrentUser}))
    .then(res => history.push("/"))
    .catch(err => {
      handleError(err.response.data);
    });
};

// Login - get user token
export const loginUser = (options) => {
  const {userData, handleError, setCurrentUser} = Object.assign({}, defaults, options);

  axios
    .post("/auth/login", userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // set timer to logout user after 5 minutes
      // (though attempts at accessing protected routes would log them out too + token will be expired)
      setTimeout(() => logoutUser(setCurrentUser), 300000);
      // Set current user
      setCurrentUser(decoded);
    })
    .catch(err => {
      console.log("ERROR: ", err);
      handleError(err.response.data);
    });
};


// Log user out
export const logoutUser = setCurrentUser => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set loggedIn to false
  setCurrentUser({});
};