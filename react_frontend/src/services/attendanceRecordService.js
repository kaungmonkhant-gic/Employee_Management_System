// src/services/attendanceRecordService.js
import apiClient from "../components/api/apiclient";

const attendanceRecordService = {
    fetchAllAttendance: async () => {
        try {
            const response = await apiClient.get("/attendance/all");
            console.log("Attendance Records:", response.data);
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error("Error fetching attendance:", error);
            return [];
        }
    },
};

export default attendanceRecordService;
