import axios from "axios";

const API_BASE_URL = "http://localhost:8081"; // Replace with your API base URL

// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the headers
    }
    config.headers["Content-Type"] = "application/json"; // Explicitly set Content-Type
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const apiService = {
  // Register a new user
  registerUser: async (userData) => {
    try {
      console.log("Service call to /register", userData);
      const response = await apiClient.post("/register", userData);
      console.log("Registration Response:", response);
      return response.data;
    } catch (error) {
      console.error("Error in registerUser:", error);
      throw error;
    }
  },

  // Fetch all employees
  getEmployees: async () => {
    try {
      console.log("Service call to /admin/all");
      const response = await apiClient.get("/admin/all");
      console.log("Response:", response);
      return response.data;
    } catch (error) {
      console.error("Error in getEmployees:", error);
      throw error;
    }
  },
};

export default apiService;
