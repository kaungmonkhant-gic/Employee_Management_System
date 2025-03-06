import employeeService from "../services/employeeService";
const employeeController = {
  // Fetch all employees
  // fetchUsers: async () => {
  //   try {
  //     const employees = await employeeService.getEmployees();
  //     return employees;
  //   } catch (error) {
  //     throw new Error("Failed to fetch users. Please try again later.");
  //   }
  // },

  fetchActiveUsers: async () => {
    try {
      const employees = await employeeService.getActiveEmployees();
      return employees;
    } catch (error) {
      throw new Error("Failed to fetch active employees. Please try again later.");
    }
  },
  fetchResignedUsers: async () => {
    try {
      const employees = await employeeService.getResignedEmployees();
      return employees;
    } catch (error) {
      throw new Error("Failed to fetch resigned employees. Please try again later.");
    }
  },


  // Fetch employees with salary details
  fetchUsersWithSalary: async () => {
    try {
      const employeesWithSalary = await employeeService.getEmployeesWithSalary();
      return employeesWithSalary.map((employee, index) => ({
        ...employee,
        number: index + 1,
        basicSalary: employee.salary ? employee.salary.basicSalary : "N/A",
        houseAllowance: employee.salary ? employee.salary.houseAllowance : "N/A",
        transportation: employee.salary ? employee.salary.transportation : "N/A",
      }));
    } catch (error) {
      throw new Error("Failed to fetch employees with salary details. Please try again later.");
    }
  },

  // Fetch positions
  fetchPositions: async () => {
    try {
      return await employeeService.getPositions();
    } catch (error) {
      throw new Error("Failed to fetch positions. Please try again later.");
    }
  },

  // Fetch departments
  fetchDepartments: async () => {
    try {
      return employeeService.getDepartments();
    } catch (error) {
      throw new Error("Failed to fetch departments. Please try again later.");
    }
  },

  // Fetch roles
  fetchRoles: async () => {
    try {
      return await employeeService.getRoles();
    } catch (error) {
      throw new Error("Failed to fetch roles. Please try again later.");
    }
  },

  registerEmployee: async (employeeData) => {
    try {
        console.log("Starting employee registration...");
        const response = await employeeService.registerEmployee(employeeData);
        console.log("Employee registered successfully:", response);
        return response;
    } catch (error) {
        console.error("Error registering employee:", error);
        throw new Error("Failed to register employee. Please try again later.");
    }
  },
  updateEmployee: async (employeeId, employeeData) => {
    try {
      console.log(`Sending update request for employee ID: ${employeeId}`, employeeData);
      const updatedEmployee = await employeeService.updateEmployee(employeeId, employeeData);
      console.log("Update response received:", updatedEmployee);
      return updatedEmployee;
    } catch (error) {
      console.error("Error in updateEmployee controller function:", error);
      throw error;
    }
  },
  
  
  deleteEmployee: async (employeeId) => {
    try {
      await employeeService.deleteEmployee(employeeId);
    } catch (error) {
      throw new Error("Failed to delete employee. Please try again later.");
    }
  },
  
  // Fetch employee, department, and manager counts
  fetchEmployeeCount: async (token) => {
    try {
      const data = await employeeService.fetchEmployeeCount(token); // Fetch employee count
      console.log("Fetched employee count:", data); // Log the data to inspect
      return data; // Return the fetched data
    } catch (error) {
      console.error("Failed to fetch active employee count:", error);
      return 0;
    }
  },
  
  fetchDepartmentCount: async (token) => {
    try {
      const data = await employeeService.fetchDepartmentCount(token); // Fetch department count
      console.log("Fetched department count:", data); // Log the data to inspect
      return data; // Extract the totalDepartments value
    } catch (error) {
      console.error("Failed to fetch department count:", error);
      return 0;
    }
  },
  
  fetchManagerCount: async (token) => {
    try {
      const data = await employeeService.fetchManagerCount(token); // Fetch manager count
      console.log("Fetched manager count:", data); // Log the data to inspect
      return data; // Extract the totalManagers value
    } catch (error) {
      console.error("Failed to fetch manager count:", error);
      return 0;
    }
  },
  
  
 
};

export default employeeController;
