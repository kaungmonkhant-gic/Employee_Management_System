const express = require("express");
const router = express.Router();
const AttendanceService = require("../services/attendanceService");

// Check-in Endpoint
router.post("/checkin", async (req, res) => {
  try {
    const { checkInTime, lateMinutes } = req.body;

    if (!checkInTime) {
      return res.status(400).json({ success: false, message: "Check-in time is required" });
    }

    const record = await AttendanceService.checkIn(checkInTime, lateMinutes);
    res.status(201).json({ success: true, record });
  } catch (error) {
    console.error("Check-in error:", error);
    res.status(500).json({ success: false, message: "Check-in failed", error: error.message });
  }
});

// Check-out Endpoint (Optional)
router.post("/checkout", async (req, res) => {
  try {
    const { userId, checkOutTime } = req.body;

    if (!userId || !checkOutTime) {
      return res.status(400).json({ success: false, message: "User ID and check-out time are required" });
    }

    const record = await AttendanceService.checkOut(userId, checkOutTime);
    res.status(200).json({ success: true, record });
  } catch (error) {
    console.error("Check-out error:", error);
    res.status(500).json({ success: false, message: "Check-out failed", error: error.message });
  }
});

module.exports = router;
