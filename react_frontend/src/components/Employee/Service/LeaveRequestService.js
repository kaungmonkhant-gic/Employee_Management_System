import apiClient from "../../api/apiclient";

const EmpLeaveService = {
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

  


 


};
export default EmpLeaveService;
