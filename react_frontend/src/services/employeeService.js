import axios from "axios";

const API_BASE_URL = "http://localhost:8081"; // Replace with your actual API URL

// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to include the Bearer token in requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the headers
    }
    config.headers["Content-Type"] = "application/json"; // Ensure JSON request format
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const employeeService = {

  getEmployees: async () => {
        try {
          console.log("Service call to /admin/all");
          const response = await apiClient.get("/employee/all");
          console.log("Response:", response);
          return response.data.employeeList;
        } catch (error) {
          console.error("Error in getEmployees:", error);
          throw error;
        }
      },

  getPositions: async () => {
    try {
      const response = await apiClient.get("/dropdown");
      return response.data; // Assuming backend returns an array of positions
    } catch (error) {
      console.error("Error fetching positions:", error);
      return [];
    }
  },

  getDepartments: async () => {
    try {
      const response = await apiClient.get("/dropdown");
      return response.data; // Assuming backend returns an array of departments
    } catch (error) {
      console.error("Error fetching departments:", error);
      return [];
    }
  },

  getRoles: async () => {
    try {
      const response = await apiClient.get("/dropdown");
      return response.data; // Assuming backend returns an array of roles
    } catch (error) {
      console.error("Error fetching roles:", error);
      return [];
    }
  },

  getEmployeesWithSalary: async () => {
    try {
      console.log("Service call to /salary");
      const response = await apiClient.get("/salary");
      console.log("Response:", response);
      return response.data;
    } catch (error) {
      console.error("Error in getEmployeesWithSalary:", error);
      throw error;
    }
  },

  registerEmployee: async (employeeData) => {
    try {
      console.log("Service call to /register", employeeData);
      const response = await apiClient.post("/employee/register", employeeData);
      console.log("Employee registered successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error registering employee:", error);
      throw error;
    }
  },
};

export default employeeService;
