// src/controllers/leaveController.js
import attendanceService from "../services/attendanceService.js";


const AttendanceController = {
  fetchAttendance : async () => {
    try {
      const attendance = await attendanceService.fetchAttendance();
      console.log("Attendance Records: Controller", attendance);
      // Add any additional business logic here if needed
      return attendance;
    } catch (error) {
      console.error("Error in attendanceController:", error);
      return [];
    }
  },
};

export default AttendanceController;
