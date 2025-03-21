import apiClient from "../../api/apiclient";


const DailyAttendanceService = {
  getAllAttendance: async () => {
    try {
      const response = await apiClient.get("attendance/self"); // Fetch all attendance records
      return response.data;
    } catch (error) {
      console.error("Error fetching attendance:", error);
      return [];
    }
  },
  checkIn: async (checkInTime, lateMinutes) => {
    try {
      const response = await apiClient.post("/attendance/checkin", { checkInTime, lateMinutes });
      return response.data; // Return the response data (attendance record)
    } catch (error) {
      console.error("Check-in failed:", error.response?.data || error.message);
      throw error;
    }
  },

  checkOut: async (checkOutTime) => {
    try {
      const response = await apiClient.post("/attendance/checkout", { checkOutTime });
      return response.data; // Return the response data (attendance record)
    } catch (error) {
      console.error("Check-out failed:", error.response?.data || error.message);
      throw error;
    }
  },
};

export default DailyAttendanceService;