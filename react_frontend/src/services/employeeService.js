
import apiClient from "../components/api/apiclient";

const employeeService = {

  getEmployees: async () => {
        try {
          console.log("Service call to /admin/all");
          const response = await apiClient.get("/employee/all");

            if (Array.isArray(response.data.employeeList)) {
              return response.data.employeeList;
            } 
          } catch (error) {
            console.error("Error in getEmployees:", error);
            throw error;
          }
      },

  getPositions: async () => {
    try {
      const response = await apiClient.get("/positions");
      return response.data; // Assuming backend returns an array of positions
    } catch (error) {
      console.error("Error fetching positions:", error);
      return [];
    }
  },

  getDepartments: async () => {
    try {
      const response = await apiClient.get("/departments");
      return response.data; // Assuming backend returns an array of departments
    } catch (error) {
      console.error("Error fetching departments:", error);
      return [];
    }
  },

  getRoles: async () => {
    try {
      const response = await apiClient.get("/roles");
      return response.data; // Assuming backend returns an array of roles
    } catch (error) {
      console.error("Error fetching roles:", error);
      return [];
    }
  },

  getEmployeesWithSalary: async () => {
    try {
      console.log("Service call to /salary");
      const response = await apiClient.get("/salary");
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
  // Update Employee
  updateEmployee: async (employeeId, employeeData) => {
    try {
      console.log(`Sending PUT request to /employee/update/${employeeId} with data:`, employeeData);
      const response = await apiClient.put(`/employee/update/${employeeId}`, employeeData);
      console.log("Response from server:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating employee in service function:", error);
      throw error;
    }
  },
  

// Delete Employee
deleteEmployee: async (employeeId) => {
  try {
    console.log(`Sending DELETE request to /employee/delete/${employeeId}`);
    const response = await apiClient.delete(`/employee/delete/${employeeId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
}

  
  
};

export default employeeService;
