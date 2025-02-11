import apiClient from "../components/api/apiclient";

const attendanceRecordService = {
  fetchAttendance: async (employeeId) => {
    try {
      const response = await apiClient.get(`/attendance?employee_id=${employeeId}`);
      console.log("Attendance Records:", response.data);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error("Error fetching attendance:", error);
      return [];
    }
  },
};

export default attendanceRecordService;
