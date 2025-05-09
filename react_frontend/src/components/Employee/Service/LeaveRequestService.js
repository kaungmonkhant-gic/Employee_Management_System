import apiClient from "../../api/apiclient";

// import apiClient from "../components/api/apiclient";

const ManagerLeaveService = {
  
  fetchLeaveRecord: async () => {
    try {
      const response = await apiClient.get("/leave/self");
      if (!response.data) {
        throw new Error("Failed to fetch leave");
      }
      return await response.data;
    } catch (error) {
      console.error("Error fetching leave :", error);
      return null;
    }
  },
  fetchLeaveSelf: async () => {
    try {
      const response = await apiClient.get("/leave/self"); // Base URL is already set in apiClient
      console.log("leave Records Response:", response.data);
      return response.data; // Axios already parses JSON automatically
    } catch (error) {
      console.error("Error fetching leave records:", error);
      throw error; // Handle errors where this function is called
    }
  },
  // Fetch manager leave count

    fetchLeaves : async () => {
       try {
           const response = await apiClient.get("/leave/role/records"); // Replace "/leaves" with your actual endpoint
           return Array.isArray(response.data) ? response.data : [];
       } catch (error) {
           console.error("Error fetching leaves:", error);
           return [];
       }
   },

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
