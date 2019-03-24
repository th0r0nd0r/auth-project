const setAuthToken = token => {
  if (token) {
    $.ajaxSetup({
      headers: { 'Authorization': token }
    });
  } else {
    delete $.ajaxSettings.headers['Authorization'];
  }
};
export default setAuthToken;