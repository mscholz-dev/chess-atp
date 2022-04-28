import axios from "axios";

// default settings for axios requests
export default axios.create({
  // default url
  baseURL: `${process.env.BASE_URL_API}/api`,
  // access to cookies
  withCredentials: true,
});
