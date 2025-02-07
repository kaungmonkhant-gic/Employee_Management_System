// src/services/leaveService.js

import apiClient from "../components/api/apiclient";

const leaveService = {

     fetchLeaves : async () => {
        try {
            // Simulate an API call (replace this with actual API logic)
            // const response = await new Promise((resolve) =>
            // setTimeout(() => resolve([{ id: 1, name: "John Doe", leaveType: "Vacation" }]), 1000)
            // );
            // return Array.isArray(response) ? response : [];
            const response = await apiClient.get("/employeeleaves"); // Replace "/leaves" with your actual endpoint
            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error("Error fetching leaves:", error);
            return [];
        }
        // try {
        //     console.log("Service call to /admin/all");
        //     const response = await apiClient.get("/employee/all");
        //     console.log("Response:", response);
        //     return response.data.employeeList;
        //   } catch (error) {
        //     console.error("Error in getEmployees:", error);
        //     throw error;
        //   }
    },

};
export default leaveService;