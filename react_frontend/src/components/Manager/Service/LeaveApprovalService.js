import apiClient from "../../api/apiclient";

const LeaveApprovalService = {
  // Fetch all leave records
  fetchLeaveRequests: async (token) => {
    try {
      console.log("Fetching Leave records...");
      const response = await apiClient.get("/leave/role/records", {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the headers
        },
      });
      console.log("Leave Records:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching leave records:", error);
      throw error;
    }
  },

  // Approve an leave request
  approveLeaveRequest: async (id, token) => {
    try {
      const response = await apiClient.put(
        `/leave/approve/${id}`,
        {},  // No body needed for approval
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Approved Leave:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error approving Leave:", error);
      throw error;
    }
  },
// Function to reject leave request with reason
rejectLeaveRequest: async (id, token) => {
  try {
    const reason = prompt("Enter rejection reason:");
    if (!reason || reason.trim() === "") {
      alert("Rejection reason is required!");
      return;
    }

    const response = await apiClient.put(
      `/leave/reject/${id}`,
      { reason: reason },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Rejected Leave:", response.rejectionReason);
    return response.rejectionReason;
  } catch (error) {
    console.error("Error rejecting Leave:", error);
    throw error;
  }
},
};
export default LeaveApprovalService;
