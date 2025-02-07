
import apiClient from "../components/api/apiclient";

const employeeService = {

  getEmployees: async () => {
    try {
      console.log("Service call to /employee/all");
      const response = await apiClient.get("/admin/all");
      console.log("Response:", response);
      return response.data;
    } catch (error) {
      console.error("Error in getEmployeesWithSalary:", error);
      throw error;
    }
  },

  registerEmployee: async (employeeData) => {
    try {
      console.log("Service call to /register", employeeData);
      const response = await apiClient.post("/employee/register", employeeData);
      console.log("Employee registered successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error registering employee:", error);
      throw error;
    }
  },
};

export default apiService;
