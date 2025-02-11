import attendanceService from "../services/attendanceService.js";

const AttendanceRecordController = {
  fetchAttendance: async (employeeId) => {
    try {
      const attendance = await attendanceService.fetchAttendance(employeeId);
      console.log("Filtered Attendance Records for Employee:", attendance);
      return attendance;
    } catch (error) {
      console.error("Error in attendanceController:", error);
      return [];
    }
  },
};

export default AttendanceRecordController;
