// src/services/leaveService.js

import apiClient from "../components/api/apiclient";
import addRowNumbers from "../components/common/AddRowNumbers";

const leaveService = {
  fetchLeaves: async () => {
    try {
      const response = await apiClient.get("/empleave"); // Fetch leave data
      return addRowNumbers(response.data); // Add numbering
    } catch (error) {
      console.error("Error fetching leaves:", error);
      return [];
    }
  },
};

export default leaveService;
