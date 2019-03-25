import setAuthToken from './authToken';
import jwt_decode from 'jwt-decode';

export const signupUser = (userData, history, handleError) => dispatch => {
  $.ajax({
    method: 'POST',
    url: '/auth/signup',
    data: userData
  })
    .then(res => history.push("/login"))
    .catch(err => 
      handleError(err)
    );
};