// src/services/AttendanceService.js

import apiClient from "../components/api/apiclient";

const attendanceService = {

     fetchAttendance : async () => {
        try {
            const response = await apiClient.get("/attendance"); // Replace "/leaves" with your actual endpoint
            console.log("Attendance Records:", response.data);
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error("Error fetching attendance:", error);
            return [];
        }
    },

};
export default attendanceService;