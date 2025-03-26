import apiClient from "../components/api/apiclient";
import axios from "axios";
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the headers
    }
    config.headers["Content-Type"] = "application/json"; // Explicitly set Content-Type
    return config;
    
  },
  (error) => {
    return Promise.reject(error);
  }
  
);

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
  resetPassword: async (currentPassword, newPassword, confirmPassword) => {
    try {
      console.log("Service call to /employee/update/password (PUT)");
      
      const response = await apiClient.put("/employee/update/password", {
        currentPassword,
        newPassword,
        confirmPassword,
      });
  
      console.log("Reset Password Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in resetPassword:", error);
      throw error;
    }
  },
  
 // Update employee profile
//  updateProfile: async (updatedDetails) => {
//   try {
//     console.log("Service call to /profile/update");
//     const response = await apiClient.put("/profile/update", updatedDetails);
//     console.log("Update Response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error in updateProfile:", error);
//     throw error;
//   }
// },


  updateProfile: async (updatedProfile) => {
    try {
      console.log("Sending PUT request to /api/employee/profile/update");
      console.log("Updated profile data:", updatedProfile);

      const response = await apiClient.put("/employee/profile/update", updatedProfile);

      console.log("Profile updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in updateProfile:", error);
      throw new Error("Failed to update profile.");
    }
  },
getEmployees: async () => {
  try {
    console.log("Service call to /admin/all");
    const response = await apiClient.get("/employee/all");

      if (Array.isArray(response.data.employeeList)) {
        return response.data.employeeList;
      } 
    } catch (error) {
      console.error("Error in getEmployees:", error);
      throw error;
    }
},

getPositions: async () => {
try {
const response = await apiClient.get("/positions");
return response.data; // Assuming backend returns an array of positions
} catch (error) {
console.error("Error fetching positions:", error);
return [];
}
},

getDepartments: async () => {
try {
const response = await apiClient.get("/departments");
return response.data; // Assuming backend returns an array of departments
} catch (error) {
console.error("Error fetching departments:", error);
return [];
}
},

getRoles: async () => {
  try {
  const response = await apiClient.get("/roles");
  return response.data; // Assuming backend returns an array of roles
  } catch (error) {
  console.error("Error fetching roles:", error);
  return [];
  }
  },
};


export default profileService;
