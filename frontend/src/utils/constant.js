// const BASE_URL = "https://dev-tinder-server-zfwo.onrender.com/api/v2";

// export default { BASE_URL };


import axios from "axios";

const api = axios.create({
  baseURL: "https://dev-tinder-server-zfwo.onrender.com",
  withCredentials: true
});

export default api;
