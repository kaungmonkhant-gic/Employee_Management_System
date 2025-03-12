import apiClient from "../../api/apiclient";

const salaryService = {
  fetchSalaryHistory: async () => {
    try {
      const response = await apiClient.get("/salary-history/self"); // Base URL is already set in apiClient
      console.log("Salary History Response:", response.data);
      return response.data; // Axios automatically parses JSON
    } catch (error) {
      console.error("Error fetching salary history:", error);
      throw error; // Handle errors where this function is called
    }
  },
};

export default salaryService;
