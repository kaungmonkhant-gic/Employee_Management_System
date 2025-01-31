import profileService from "../services/profileService";

const profileController = {
  fetchProfile: async () => {
    try {
      const profile = await profileService.getProfile();
      // Perform additional processing if needed
      return profile;
    } catch (error) {
      throw new Error("Failed to fetch profile. Please try again later.");
    }
  },
};

export default profileController;