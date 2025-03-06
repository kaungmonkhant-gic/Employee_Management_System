import leaveservice from "../Service/LeaveApprovalService";

const LeaveApprovalController = {
  // Fetch leave requests
  fetchLeaveRequests: async (token) => {
    try {
      const records = await leaveservice.fetchLeaveRequests(token);
      return records;
    } catch (error) {
      throw new Error("Failed to fetch leave records. Please try again later.");
    }
  },

  // Approve an overtime request
  approveRequest: async (id, token) => {
    try {
      const updatedRecord = await leaveservice.approveLeaveRequest(id, token);
      return updatedRecord;
    } catch (error) {
      throw new Error(`Failed to approve request. Error: ${error.message}`);
    }
  },

  // Reject an overtime request
  rejectRequest: async (id, token) => {
    try {
      const updatedRecord = await leaveservice.rejectLeaveRequest(id, token);
      return updatedRecord;
    } catch (error) {
      throw new Error(`Failed to reject request. Error: ${error.message}`);
    }
  },

  // Add a new overtime record
  addLeaveRecord: async (leaveData, token) => {
    try {
      const newRecord = await leaveservice.addLeaveRecord(leaveData, token);
      return newRecord;
    } catch (error) {
      throw new Error("Failed to add leave record. Please try again later.");
    }
  },
};

export default LeaveApprovalController;
