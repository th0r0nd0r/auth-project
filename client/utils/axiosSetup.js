import axios from "axios";

// setting the default baseURL for api requests. 
// simple/sloppy setting for ease of use since there will be no prod environment
export default axios.create({
  baseURL: "http://localhost:4000",
  responseType: "json"
});