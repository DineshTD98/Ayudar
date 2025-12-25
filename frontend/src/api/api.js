import axios from "axios";

const api = axios.create({
  baseURL: "https://ayudar.onrender.com",
});

//token for the header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    console.log("INTERCEPTOR TOKEN:", token);
    console.log("REQUEST URL:", config.url);
    console.log("HEADERS BEFORE:", config.headers);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("HEADERS AFTER:", config.headers);
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
