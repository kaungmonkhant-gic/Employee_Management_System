//import profileService from "../components/Manager/Service/profileService";
import profileService from "../../../services/profileService";
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
  
};

export default EmpLeaveRequestController;