import axios from "axios";
const BASE_URL=import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL:BASE_URL,
  withCredentials: true
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
