import otservice from "../Service/otservice";

const managerOTController = {
  // Fetch overtime requests
  fetchOvertimeRequests: async (token) => {
    try {
      const records = await otservice.fetchOvertimeRequests(token);
      return records;
    } catch (error) {
      throw new Error("Failed to fetch overtime records. Please try again later.");
    }
  },

  // Approve an overtime request
  approveRequest: async (id, token) => {
    try {
      const updatedRecord = await otservice.approveOvertimeRequest(id, token);
      return updatedRecord;
    } catch (error) {
      throw new Error(`Failed to approve request. Error: ${error.message}`);
    }
  },

  // Reject an overtime request
  rejectRequest: async (id, token) => {
    try {
      const updatedRecord = await otservice.rejectOvertimeRequest(id, token);
      return updatedRecord;
    } catch (error) {
      throw new Error(`Failed to reject request. Error: ${error.message}`);
    }
  },

  // Add a new overtime record
  addOvertimeRecord: async (overtimeData, token) => {
    try {
      const newRecord = await otservice.addOvertimeRecord(overtimeData, token);
      return newRecord;
    } catch (error) {
      throw new Error("Failed to add overtime record. Please try again later.");
    }
  },
};

export default managerOTController;
