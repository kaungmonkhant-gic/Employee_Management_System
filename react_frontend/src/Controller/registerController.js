import registerService from "../services/registerService";

const registerController = {
  registerEmployee: async (employeeData) => {
    try {
      console.log("Registering new employee", employeeData);
      const response = await registerService.registerUser(employeeData);
      // Perform additional processing if needed
      return response;
    } catch (error) {
      console.error("Error registering employee:", error);
      throw new Error("Failed to register employee. Please try again later.");
    }
  },
};

export default registerController;
