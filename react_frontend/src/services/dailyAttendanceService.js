import axios from "axios";

// Use BASE_URL as the base for the API
const BASE_URL = "http://localhost:8081"; // Ensure correct API URL

const DailyAttendanceService = {
  getAllAttendance: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/attendance/all`); // Fetch all attendance records
      return response.data;
    } catch (error) {
      console.error("Error fetching attendance:", error);
      return [];
    }
  },

  checkIn: async (checkInTime, lateMinutes) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Set the Authorization header

      console.log("Headers:", headers); // Log headers to debug

      const response = await axios.post(
        `${BASE_URL}/attendance/checkin`, // API endpoint for check-in
        { checkInTime, lateMinutes },
        { headers } // Attach token as headers
      );

      return response.data; // Return the response data (attendance record)
    } catch (error) {
      console.error("Check-in failed:", error.response?.data || error.message);
      throw error;
    }
  },

  checkOut: async (checkOutTime) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token
      const headers = token ? { Authorization: `Bearer ${token}` } : {}; // Attach token

      const response = await axios.post(
        `${BASE_URL}/attendance/checkout`, // API endpoint for check-out
        { checkOutTime },
        { headers } // Attach token as headers
      );

      return response.data; // Return the response data (attendance record)
    } catch (error) {
      console.error("Check-out failed:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default DailyAttendanceService;
