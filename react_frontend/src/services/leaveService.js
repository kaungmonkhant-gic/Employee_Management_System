// src/services/leaveService.js

import apiClient from "../components/api/apiclient";

const leaveService = {

     fetchLeaves : async () => {
        try {
            const response = await apiClient.get("/leave/all"); // Replace "/leaves" with your actual endpoint
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error("Error fetching leaves:", error);
            return [];
        }
    },

};
export default leaveService;