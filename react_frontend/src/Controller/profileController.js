import profileService from "../services/profileService";

const profileController = {
  fetchEmpProfile: async () => {
    try {
      const profile = await profileService.getProfile();

      return profile;
    } catch (error) {
      throw new Error("Failed to fetch profile. Please try again later.");
    }
  },
   // Update employee profile
   updateProfile: async (updatedDetails) => {
    try {
      const updatedProfile = await profileService.updateProfile(updatedDetails);
      console.log("Updated Profile:", updatedProfile);
      return updatedProfile;
    } catch (error) {
      throw new Error("Failed to update profile. Please try again later.");
    }
  },

  updatePassword: async (currentPassword, newPassword, confirmPassword) => {
    try {
      return await profileService.resetPassword(currentPassword, newPassword, confirmPassword);
    } catch (error) {
      console.error("Controller Error updating password:", error);
      return { statusCode: 500, message: "Error updating password" };
    }
  },
  
    // Fetch positions
    fetchPositions: async () => {
      try {
        return await profileService.getPositions();
      } catch (error) {
        throw new Error("Failed to fetch positions. Please try again later.");
      }
    },
  
    // Fetch departments
    fetchDepartments: async () => {
      try {
        return profileService.getDepartments();
      } catch (error) {
        throw new Error("Failed to fetch departments. Please try again later.");
      }
    },
  
    // Fetch roles
    fetchRoles: async () => {
      try {
        return await profileService.getRoles();
      } catch (error) {
        throw new Error("Failed to fetch roles. Please try again later.");
      }
    },

};

export default profileController;