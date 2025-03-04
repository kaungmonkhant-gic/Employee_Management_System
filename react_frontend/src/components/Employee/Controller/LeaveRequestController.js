// Code for Leave Request Controller
import leaveService from "../Service/LeaveRequestService";
import { getRemainingLeaveDays } from "../Service/LeaveRequestService";


const EmpLeaveRequestController = {

    fetchLeaveCounts: async (setPending, setApproved, setRejected) => {
        try {
          const data = await leaveService.getLeaveCounts();
          setPending(data.PENDING);
          setApproved(data.APPROVED);
          setRejected(data.REJECTED);
        } catch (error) {
          console.error("Failed to fetch leave counts", error);
        }
      },
    
      submitLeaveRequest: async (leaveData, onSuccess, onError) => {
        try {
          const response = await leaveService.applyForLeave(leaveData);
          onSuccess(response);
        } catch (error) {
          onError(error);
        }
      },

      getLeaveBalance: async () => {
        const data = await leaveService.fetchLeaveBalanceFromAPI();
        if (!data) return { annualLeave: 0, casualLeave: 0, medicalLeave: 0 };
        
        return {
          annualLeave: data.annualLeave,
          casualLeave: data.casualLeave,
          medicalLeave: data.medicalLeave,
        };
      },

      fetchRemainingLeaveDays: async (leaveType) => {
        const leaveBalance = await leaveService.fetchLeaveBalanceFromAPI();
        if (leaveBalance) {
          return leaveService.getRemainingLeaveDays(leaveType, leaveBalance);
        }
        return 0;
      },
  
};

export default EmpLeaveRequestController;