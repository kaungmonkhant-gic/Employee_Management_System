import apiClient from "../../api/apiclient";

const EmpLeaveService = {
  // Fetch all overtime records
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
};
export default EmpLeaveService;
