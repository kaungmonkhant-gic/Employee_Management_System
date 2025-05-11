import apiClient from "../components/api/apiclient";
import addRowNumbers from "../components/common/AddRowNumbers";
const overtimeService = {
  // Fetch all overtime records
  getOvertimeRecords: async () => {
    try {
      console.log("Fetching overtime records...");
      const response = await apiClient.get("/ot/role/records");
      console.log("Overtime Records:", response.data);
      return addRowNumbers(response.data); // Apply numbering utility
    } catch (error) {
      console.error("Error fetching overtime records:", error);
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

export default overtimeService