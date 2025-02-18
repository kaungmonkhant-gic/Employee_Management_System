const db = require("../models"); // Assuming Sequelize ORM

class AttendanceService {
  // Check-in function
  static async checkIn(checkInTime, lateMinutes) {
    try {
      const record = await db.Attendance.create({ checkInTime, lateMinutes });
      return record;
    } catch (error) {
      throw new Error("Database error: " + error.message);
    }
  }

  // Check-out function
  static async checkOut(userId, checkOutTime) {
    try {
      const record = await db.Attendance.update(
        { checkOutTime },
        { where: { userId, checkOutTime: null } }
      );
      return record;
    } catch (error) {
      throw new Error("Database error: " + error.message);
    }
  }
}

module.exports = AttendanceService;
