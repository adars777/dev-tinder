import axios from "axios";
import BASE_URL from "./constant";

if (import.meta.env.PROD) {
  axios.defaults.baseURL = BASE_URL;
}
axios.defaults.withCredentials = true;

export default axios;