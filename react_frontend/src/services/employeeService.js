
import apiClient from "../components/api/apiclient";

const employeeService = {

  getActiveEmployees: async () => {
    try {
      console.log("Fetching active employees...");
      const response = await apiClient.get("/employee/active");

      if (Array.isArray(response.data)) {
        return response.data;
      }
    } catch (error) {
      console.error("Error in getActiveEmployees:", error);
      throw error;
    }
  },

  getResignedEmployees: async () => {
    try {
      console.log("Fetching resigned employees...");
      const response = await apiClient.get("/employee/resigned");

      if (Array.isArray(response.data)) {
        return response.data;
      }
    } catch (error) {
      console.error("Error in getResignedEmployees:", error);
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
},

fetchEmployeeCount: async (token) => {
  try {
    const response = await apiClient.get("/employee/active-count", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // Expecting a numeric value from the backend
  } catch (error) {
    console.error("Error fetching active employee count:", error);
    return 0;
  }
},

fetchDepartmentCount: async (token) => {
  try {
    const response = await apiClient.get("/departments/count", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Department count response:", response.data); // Log the response to inspect the data
    return response.data || 0; // Extract 'count' directly from response
  } catch (error) {
    console.error("Error fetching department count:", error);
    return 0;
  }
},

fetchManagerCount: async (token) => {
  try {
    const response = await apiClient.get("/employee/manager-count", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Manager count response:", response.data); // Log the response to inspect the data
    return response.data || 0; // Extract 'count' directly from response
  } catch (error) {
    console.error("Error fetching active manager count:", error);
    return 0;
  }
},

};

export default employeeService;
