import apiClient from "../components/api/apiclient";

const salaryService = {

     fetchLeaves : async () => {
        try {
        
            const response = await apiClient.get("/salary/all"); // Replace "/leaves" with your actual endpoint
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error("Error fetching salaries:", error);
            return [];
        }
      
    },

};
export default salaryService;