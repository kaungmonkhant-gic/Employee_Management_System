import apiClient from "../components/api/apiclient";

const salaryService = {

  fetchSalaryData : async () => {
    try {
    
        const response = await apiClient.get("/salary/all"); // Replace "/leaves" with your actual endpoint
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error("Error fetching salaries:", error);
        return [];
    }
  
},
     fetchSalary : async () => {
        try {
        
            const response = await apiClient.get("salary/data?year={year}&month={month}"); // Replace "/leaves" with your actual endpoint
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error("Error fetching salaries:", error);
            return [];
        }
    },

  calculateSalary: async (salaryData) => {
    try {
      console.log("Sending salary calculation request with data:", salaryData);

      // Sending a POST request with employee salary calculation data
      const response = await apiClient.post("/salary/calculate", salaryData);

      console.log("Salary calculation response:", response.data);
      return response.data; // Returns updated salary data from backend
    } catch (error) {
      console.error("Error in salary calculation service:", error);
      throw error; // Throw error for handling in the controller
    }
  },
};

export default salaryService;

