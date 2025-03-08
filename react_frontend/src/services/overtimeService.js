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
  // markAsPaid : async (id, token) => {
  //   try {
  //     const response = await apiClient.put(
  //       `/ot/paid/${id}`,
  //       {},  // No body needed for approval
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //     console.log("paid OT:", response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error paid OT:", error);
  //     throw error;
  //   }
  // },
  // In overtimeController.js
  markAsPaid : async (id) => {
  try {
    const response = await apiClient.put(`/ot/paid/${id}`);
    return { success: true, message: 'OT request marked as paid.' };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'An error occurred.' };
  }
},

};

export default overtimeService