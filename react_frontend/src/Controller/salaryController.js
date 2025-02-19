// src/controllers/leaveController.js
import salaryService from "../services/salaryService";


const salaryController = {
  fetchSalaryData : async () => {
    try {
      const salaries = await salaryService.fetchSalaries();
      // Add any additional business logic here if needed
      return salaries;
    } catch (error) {
      console.error("Error in salaryController:", error);
      return [];
    }
  },
};

export default salaryController;
