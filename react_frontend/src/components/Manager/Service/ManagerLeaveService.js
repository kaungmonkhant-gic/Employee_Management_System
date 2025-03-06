import apiClient from "../../api/apiclient";

const ManagerLeaveService = {
  // Fetch manager leave count
  getLeaveCounts: async () => {
    try {
      const response = await apiClient.get("/leave/status-count");
      return response.data;
    } catch (error) {
      console.error("Error fetching leave request counts:", error);
      throw error;
    }
  },

  applyForLeave: async (leaveData) => {
    try {
      const response = await apiClient.post("/leave/submit", leaveData);
      return response.data;
    } catch (error) {
      console.error("Error applying for leave:", error);
      throw error;
    }
  },

  fetchLeaveBalanceFromAPI: async () => {
    try {
      const response = await apiClient.get("/empleave/self");
      if (!response.data) {
        throw new Error("Failed to fetch leave balance");
      }
      return await response.data;
    } catch (error) {
      console.error("Error fetching leave balance:", error);
      return null;
    }
  },

  getRemainingLeaveDays : (leaveType, leaveBalance) => {
    const leaveMapping = {
      "Annual Leave": leaveBalance?.annualLeave || 0,
      "Casual Leave": leaveBalance?.casualLeave || 0,
      "Medical Leave": leaveBalance?.medicalLeave || 0,
    };
  
    return leaveMapping[leaveType] || 0;
  }
  
};
export default ManagerLeaveService;
