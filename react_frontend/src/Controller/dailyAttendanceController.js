import dailyAttendanceService from "../services/dailyAttendanceService.js";

const dailyAttendanceController = {
  
  getAllAttendance: async () => {
    try {
      const attendanceRecords = await dailyAttendanceService.getAllAttendance();
      return attendanceRecords;
    } catch (error) {
      console.error("Error in dailyAttendanceController:", error);
      return [];
    }
  },

  checkIn: async (req, res) => {
    try {
      const { checkInTime, lateMinutes } = req.body;
      const newAttendance = await dailyAttendanceService.checkIn(checkInTime, lateMinutes);
      res.status(200).json(newAttendance);
    } catch (error) {
      console.error("Error in check-in:", error);
      res.status(403).json({ error: "Unauthorized or Invalid data" });
    }
  },

  checkOut: async (req, res) => {
    try {
      const { checkOutTime } = req.body;
      const updatedAttendance = await dailyAttendanceService.checkOut(checkOutTime);
      res.status(200).json(updatedAttendance);
    } catch (error) {
      console.error("Error in check-out:", error);
      res.status(403).json({ error: "Unauthorized or Invalid data" });
    }
  },
};

export default dailyAttendanceController;
