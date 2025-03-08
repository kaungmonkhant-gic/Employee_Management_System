// Code for Leave Request Controller
import leaveService from "../Service/ManagerLeaveService";
<<<<<<< HEAD

const ManagerLeaveRequestController = {

  fetchLeaveRecords : async () => {
    try {
      const response = await leaveService.fetchLeaveSelf();
      console.log("Leave Records:", response);
      return response;
    } catch (err) {
      console.error("Error fetching leave records:", err);
      return [];}
     } ,

     fetchLeaveData : async () => {
      try {
        const leaves = await leaveService.fetchLeaves();
        // Add any additional business logic here if needed
        return leaves;
      } catch (error) {
        console.error("Error in leaveController:", error);
        return [];
      }
    },
=======
// import { getRemainingLeaveDays } from "../Service/LeaveRequestService";
import ManagerLeaveService from "../Service/ManagerLeaveService";


const ManagerLeaveRequestController = {

  fetchLeaveData : async () => {
    try {
      const leaves = await ManagerLeaveService.fetchLeaves();
      // Add any additional business logic here if needed
      return leaves;
    } catch (error) {
      console.error("Error in leaveController:", error);
      return [];
    }
  },
>>>>>>> 576afdd096a37513116f91d02b66d58eaab8b531

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

export default ManagerLeaveRequestController;