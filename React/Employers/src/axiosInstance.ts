import axios from 'axios';

console.log("API_URL:", import.meta.env.VITE_API_URL);

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log("interceptor triggered, token:", token);

    console.log("inter");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    console.log("headers:", config.headers);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;