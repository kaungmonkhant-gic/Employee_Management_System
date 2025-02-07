import profileService from "../services/profileService";

const profileController = {
  fetchEmpProfile: async () => {
    try {
      const profile = await profileService.getProfile();
      console.log("Profile:", profile);

      return profile;
    } catch (error) {
      throw new Error("Failed to fetch profile. Please try again later.");
    }
  },
};

export default profileController;