// src/services/profileService.js

import apiClient from "../components/api/apiclient"; // Import existing apiClient

const profileService = {
  getProfile: async () => {
    try {
      console.log("Service call to /profile");
      const response = await apiClient.get("/employee/profile");
      console.log("Profile Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in getProfile:", error);
      throw error;
    }
  },
};

export default profileService;
