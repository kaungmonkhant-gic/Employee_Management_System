import apiClient from "../../api/apiclient";

const managerOTService = {
  // Fetch all overtime records
  fetchOvertimeRequests: async () => {
    try {
      console.log("Fetching overtime records...");
      const response = await apiClient.get("/ot/all");
      console.log("Overtime Records:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching overtime records:", error);
      throw error;
    }
  },

    // Approve an overtime request
  approveOvertimeRequest: async (id) => {
    try {
      console.log(`Approving request ID: ${id}`);
      const response = await apiClient.put(`/ot/update/${id}`, { status: "Approved" });
      console.log("Approved Overtime Request:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error approving request ID: ${id}`, error);
      throw error;
    }
  },

  // Reject an overtime request
  rejectOvertimeRequest: async (id) => {
    try {
      console.log(`Rejecting request ID: ${id}`);
      const response = await apiClient.put(`/ot/update/${id}`, { status: "Rejected" });
      console.log("Rejected Overtime Request:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error rejecting request ID: ${id}`, error);
      throw error;
    }
  },

  // Add a new overtime record
  // addOvertimeRecord: async (record) => {
  //   try {
  //     console.log("Adding overtime record:", record);
  //     const response = await apiClient.post("/overtime", record);
  //     console.log("Added Overtime Record:", response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error adding overtime record:", error);
  //     throw error;
  //   }
  // },
};

export default managerOTService