import employeeService from "../services/employeeService";
const employeeController = {
  // Fetch all employees
  fetchUsers: async () => {
    try {
      const employees = await employeeService.getEmployees();
      return employees;
    } catch (error) {
      throw new Error("Failed to fetch users. Please try again later.");
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
      return await employeeService.getDepartments();
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
      return await employeeService.registerEmployee(employeeData);
    } catch (error) {
      throw new Error("Failed to register employee. Please try again later.");
    }
  },

 
};

export default employeeController;
