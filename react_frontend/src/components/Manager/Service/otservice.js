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
      console.log(`Approving request ID: ${id}`);
      const response = await apiClient.put(
        `/ot/approve/${id}`,
        { status: "Approved" },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the headers
          },
        }
      );
      console.log("Approved Overtime Request:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error approving request ID: ${id}`, error);
      throw error;
    }
  },

  // Reject an overtime request
  rejectOvertimeRequest: async (id, token) => {
    try {
      console.log(`Rejecting request ID: ${id}`);
      const response = await apiClient.put(
        `/ot/reject/${id}`,
        { status: "Rejected" },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the headers
          },
        }
      );
      console.log("Rejected Overtime Request:", response.data);
      return response.data;
    } catch (error) {
      console.error(`Error rejecting request ID: ${id}`, error);
      throw error;
    }
  },

  // Add a new overtime record
  // addOvertimeRecord: async (record, token) => {
  //   try {
  //     console.log("Adding overtime record:", record);
  //     const response = await apiClient.post("/overtime", record, {
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Add token to the headers
  //       },
  //     });
  //     console.log("Added Overtime Record:", response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error adding overtime record:", error);
  //     throw error;
  //   }
  // },
};

export default managerOTService;
