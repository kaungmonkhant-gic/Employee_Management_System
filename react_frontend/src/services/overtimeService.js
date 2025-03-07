import apiClient from "../components/api/apiclient";

const overtimeService = {
  // Fetch all overtime records
  getOvertimeRecords: async () => {
    try {
      console.log("Fetching overtime records...");
      const response = await apiClient.get("/ot/role/records");
      console.log("Overtime Records:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching overtime records:", error);
      throw error;
    }
  },

  // Add a new overtime record
  addOvertimeRecord: async (record) => {
    try {
      console.log("Adding overtime record:", record);
      const response = await apiClient.post("/overtime", record);
      console.log("Added Overtime Record:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding overtime record:", error);
      throw error;
    }
  },
  markAsPaid : async (id) => {
    try {
      const response = await apiClient.put(`/ot/paid/${id}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to mark as paid: " + error.response?.data?.message || error.message);
    }
  },
};

export default overtimeService