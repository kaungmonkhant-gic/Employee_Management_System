// src/controllers/leaveController.js
import payrollService from "../services/payrollService.js";


const payrollController = {
  fetchSalaryHistory : async () => {
    try {
      const salaryHistory = await payrollService.fetchPayroll();
      // Add any additional business logic here if needed
      return salaryHistory;
    } catch (error) {
      console.error("Error in payroll controller:", error);
      return [];
    }
  },
};

export default payrollController;
