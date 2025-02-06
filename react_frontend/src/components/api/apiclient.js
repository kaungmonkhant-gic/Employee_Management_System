// src/api/apiClient.js
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8081";; // Replace with your actual base URL

// Create an Axios instance with default configurations
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to include the Bearer token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling (optional)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global errors here, e.g., unauthorized access
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Please log in again.");
      // Optionally redirect to login page or clear token
    }
    return Promise.reject(error);
  }
);

export default apiClient;