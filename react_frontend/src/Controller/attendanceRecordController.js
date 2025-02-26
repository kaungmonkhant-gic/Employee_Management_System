// src/controllers/attendanceRecordController.js
import attendanceRecordService from "../services/attendanceRecordService.js";

const attendanceRecordController = {

  fetchAttendance: async () => {
    try {
      const attendance = await attendanceRecordService.fetchAllAttendance();
      console.log("Attendance Records: Controller", attendance);
      return attendance;
    } catch (error) {
      console.error("Error in attendanceController:", error);
      return [];
    }
  },
};

export default attendanceRecordController;
