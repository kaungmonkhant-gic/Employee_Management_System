// src/controllers/leaveController.js
import leaveService from "../services/leaveService.js";


const leaveController = {
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
};

export default leaveController;
