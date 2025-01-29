import axios from "axios";

const API_BASE_URL = "http://localhost:8080"; // Replace with your API base URL

// Create an axios instance with default configuration
const apiClient = axios.create({
  
  baseURL: API_BASE_URL,
});

// // Add an interceptor to include the Bearer token in all requests
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token"); // Retrieve the token from localStorage
//     console.log(token);
//     if (token) {
//       console.log("header call");
//       config.headers.Authorization = `Bearer ${token}`; // Add the token to the headers
//       console.log(config);
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


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


const employeeService = {
  getEmployees: async () => {
    try {
      console.log("Service call to /employee/all");
      const response = await apiClient.get("/admin/all");
      console.log("Response:", response);
      return response.data;
    } catch (error) {
      console.error("Error in getEmployees:", error);
      throw error;
    }
  },
};

export default employeeService;
