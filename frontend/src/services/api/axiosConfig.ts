import axios from "axios";
import { getLanguageAndToken } from "./getLanguageAndToken";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-Access-Api": process.env.NEXT_PUBLIC_API_KEY,
  },
  timeout: 10 * 60 * 1000, // 10 minutes
});

// Add a request interceptor to set the language
axiosInstance.interceptors.request.use(
  async (config) => {
    const { lang, token } = await getLanguageAndToken();
    console.log("lang", lang);
    config.headers["lang"] = lang;
    //if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized access, redirecting to login...");
      //logOut();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
