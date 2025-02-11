// src/services/payrollService.js

import apiClient from "../components/api/apiclient";

const payrollService = {

     fetchPayroll : async () => {
        try {
            const response = await apiClient.get("/salary-history"); 
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error("Error fetching salary history:", error);
            return [];
        }

    },

};
export default payrollService;