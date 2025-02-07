import axios from "axios";

const API_BASE_URL = "http://localhost:8081"; // Replace with your API base URL

// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
    }
    config.headers["Content-Type"] = "application/json"; // Explicitly set Content-Type
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const overtimeService = {
  // Fetch all overtime records
  getOvertimeRecords: async () => {
    try {
      console.log("Fetching overtime records...");
      const response = await apiClient.get("/overtime");
      console.log("Overtime Records:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching overtime records:", error);
      throw error;
    }
  },

  // Add a new overtime record
  addOvertimeRecord: async (record) => {
    try {
      console.log("Adding overtime record:", record);
      const response = await apiClient.post("/overtime", record);
      console.log("Added Overtime Record:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding overtime record:", error);
      throw error;
    }
  },
};

export default overtimeService