// Code for Leave Request Controller
import leaveRequestService from "../services/LeaveRequestService";
import { getRemainingLeaveDays } from "../Service/LeaveRequestService";


const AdminLeaveRequestController = {
    fetchLeaveRecord: async (token) => {
        try {
          const records = await leaveRequestService.fetchLeaveRecord(token);
          return records;
        } catch (error) {
          throw new Error("Failed to fetch leave records. Please try again later.");
        }
      },
       // Fetch leave requests
  fetchLeaveRequests: async (token) => {
    try {
      const records = await leaveRequestService.fetchLeaveRequests(token);
      return records;
    } catch (error) {
      throw new Error("Failed to fetch leave records. Please try again later.");
    }
  },

    fetchLeaveCounts: async (setPending, setApproved, setRejected) => {
        try {
          const data = await leaveRequestService.getLeaveCounts();
          setPending(data.PENDING);
          setApproved(data.APPROVED);
          setRejected(data.REJECTED);
        } catch (error) {
          console.error("Failed to fetch leave counts", error);
        }
      },
    
      submitLeaveRequest: async (leaveData, onSuccess, onError) => {
        try {
          const response = await leaveRequestService.applyForLeave(leaveData);
          onSuccess(response);
        } catch (error) {
          onError(error);
        }
      },

      getLeaveBalance: async () => {
        const data = await leaveRequestService.fetchLeaveBalanceFromAPI();
        if (!data) return { annualLeave: 0, casualLeave: 0, medicalLeave: 0 };
        
        return {
          annualLeave: data.annualLeave,
          casualLeave: data.casualLeave,
          medicalLeave: data.medicalLeave,
        };
      },

      fetchRemainingLeaveDays: async (leaveType) => {
        const leaveBalance = await leaveRequestService.fetchLeaveBalanceFromAPI();
        if (leaveBalance) {
          return leaveRequestService.getRemainingLeaveDays(leaveType, leaveBalance);
        }
        return 0;
      },
  
};

export default AdminLeaveRequestController;