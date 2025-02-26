import otservice from "../Service/otservice";

const managerOTController = {
  fetchOvertimeRequests: async () => {
    try {
      const records = await otservice.fetchOvertimeRequests();
      return records;
    } catch (error) {
      throw new Error("Failed to fetch overtime records. Please try again later.");
    }
  },

   // Approve an overtime request
   approveRequest: async (id) => {
    try {
      const updatedRecord = await otservice.approveOvertimeRequest(id);
      return updatedRecord;
    } catch (error) {
      throw new Error(`Failed to approve request. Error: ${error.message}`);
    }
  },

  // Reject an overtime request
  rejectRequest: async (id) => {
    try {
      const updatedRecord = await otservice.rejectOvertimeRequest(id);
      return updatedRecord;
    } catch (error) {
      throw new Error(`Failed to reject request. Error: ${error.message}`);
    }
  },

  addOvertimeRecord: async (overtimeData) => {
    try {
      const newRecord = await otservice.addOvertimeRecord(overtimeData);
      return newRecord;
    } catch (error) {
      throw new Error("Failed to add overtime record. Please try again later.");
    }
  },
};

export default managerOTController;
