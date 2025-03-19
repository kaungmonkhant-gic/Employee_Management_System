// src/controllers/leaveController.js
import salaryService from "../services/salaryService";


const salaryController = {
  fetchSalaryData : async () => {
    try {
      const salaries = await salaryService.fetchLeaves();
      // Add any additional business logic here if needed
      return salaries;
    } catch (error) {
      console.error("Error in salaryController:", error);
      return [];
    }
  },

  calculateSalary: async (salaryData) => {
    try {
      console.log("Processing salary calculation in controller:", salaryData);
      const calculatedSalaries = await salaryService.calculateSalary(salaryData);
      return calculatedSalaries;
    } catch (error) {
      console.error("Error in salary calculation controller:", error);
      throw error;
    }
  },
};

export default salaryController;
