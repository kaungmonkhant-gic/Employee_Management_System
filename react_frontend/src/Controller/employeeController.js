import employeeService from "../services/employeeService";
import apiService from "../services/employeeService";

const employeeController = {
  fetchUsers: async () => {
    try {
      const users = await employeeService.getEmployees();
      // Perform additional processing if needed
      return users;
    } catch (error) {
      throw new Error("Failed to fetch users. Please try again later.");
    }
  },
};

export default employeeController;
