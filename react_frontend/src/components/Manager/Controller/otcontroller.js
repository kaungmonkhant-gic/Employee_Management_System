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

  fetchOvertimeSelf: async (token) => {
    try {
      const records = await otservice.fetchOvertimeSelf(token);
      return records;
    } catch (error) {
      throw new Error("Failed to fetch overtime records. Please try again later.");
    }
  },

  // Submit a new overtime request
  submitOTRequest: async (otData) => {
    try {
      const response = await otservice.submitOTRequest(otData);
      return response;
    } catch (error) {
      throw new Error("Failed to submit overtime request. Please try again.");
    }
  },

  // Get overtime status counts (Pending, Approved, Rejected)
  getOTCounts: async () => {
    try {
      const counts = await otservice.getOTCounts();
      return counts;
    } catch (error) {
      throw new Error("Failed to fetch overtime request counts.");
    }
  },

    // getOTCounts: async (setPending, setApproved, setRejected) => {
    //     try {
    //       const data = await OTRequestService.getOTCounts();
    //       setPending(data.PENDING);
    //       setApproved(data.APPROVED);
    //       setRejected(data.REJECTED);
    //     } catch (error) {
    //       console.error("Failed to fetch leave counts", error);
    //     }
    //   },

    //   getOTCounts: async (setPending, setApproved, setRejected) => {
    //     try {
    //       const data = await otservice.getOTCounts();
    //       setPending(data.PENDING);
    //       setApproved(data.APPROVED);
    //       setRejected(data.REJECTED);
    //     } catch (error) {
    //       console.error("Failed to fetch leave counts", error);
    //     }
    //   },
};

export default managerOTController;
