import apiClient from "../components/api/apiclient";

const salaryService = {

     fetchSalaries : async () => {
        try {
        
            const response = await apiClient.get("/salary/all"); 
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error("Error fetching salaries:", error);
            return [];
        }
      
    },

};
export default salaryService;