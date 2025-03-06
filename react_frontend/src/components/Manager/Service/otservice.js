import apiClient from "../../api/apiclient";

const managerOTService = {
  // Fetch all overtime records
  fetchOvertimeRequests: async (token) => {
    try {
      console.log("Fetching overtime records...");
      const response = await apiClient.get("/ot/all", {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the headers
        },
      });
      console.log("Overtime Records:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching overtime records:", error);
      throw error;
    }
  },

  // Approve an overtime request
  approveOvertimeRequest: async (id, token) => {
    try {
      const response = await apiClient.put(
        `/ot/approve/${id}`,
        {},  // No body needed for approval
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Approved OT:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error approving OT:", error);
      throw error;
    }
  },
// Function to reject OT request with reason
rejectOvertimeRequest: async (id, token) => {
  try {
    const reason = prompt("Enter rejection reason:");
    if (!reason || reason.trim() === "") {
      alert("Rejection reason is required!");
      return;
    }
    const response = await apiClient.put(
      `/ot/reject/${id}`,
      { reason: reason },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Rejected OT:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error rejecting OT:", error);
    throw error;
  }
},

fetchOvertimeSelf: async () => {
  try {
    const response = await apiClient.get("/ot/self"); // Base URL is already set in apiClient
    console.log("OT Records Response:", response.data);
    return response.data; // Axios already parses JSON automatically
  } catch (error) {
    console.error("Error fetching overtime records:", error);
    throw error; // Handle errors where this function is called
  }
},

 // Submit a new overtime request
 submitOTRequest: async (otData) => {
  try {
    const response = await apiClient.post("/ot/submit", otData);
    return response.data;
  } catch (error) {
    console.error("Error submitting overtime request:", error);
    throw error;
  }
},


};
export default managerOTService;
