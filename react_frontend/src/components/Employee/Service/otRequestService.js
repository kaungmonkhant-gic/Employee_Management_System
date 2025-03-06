import apiClient from "../../api/apiclient";

const OTRequestService = {
  // Fetch all overtime records

  getOTCounts: async () => {
    try {
      const response = await apiClient.get("/ot/status-count");
      return response.data;
    } catch (error) {
      console.error("Error fetching leave request counts:", error);
      throw error;
    }
  },

  getOTRequests: async () => {
    try {
      const response = await apiClient.get("/ot/requests");
      return response.data;
    } catch (error) {
      console.error("Error fetching overtime requests:", error);
      throw error;
    }
  },

  // Fetch overtime request by ID (for detailed view)
  getOTRequestById: async (id) => {
    try {
      const response = await apiClient.get(`/overtime/requests/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching overtime request with ID ${id}:`, error);
      throw error;
    }
  },

  // Submit a new overtime request
  submitOTRequest: async (otData) => {
    try {
      const response = await apiClient.post("/overtime/submit", otData);
      return response.data;
    } catch (error) {
      console.error("Error submitting overtime request:", error);
      throw error;
    }
  },

  // Update the status of an overtime request (approved/rejected)
  updateOTRequestStatus: async (id, status, comment) => {
    try {
      const response = await apiClient.patch(`/overtime/requests/${id}/status`, { status, comment });
      return response.data;
    } catch (error) {
      console.error(`Error updating status of overtime request with ID ${id}:`, error);
      throw error;
    }
  },

  // Fetch OT requests by employee
  getOTRequestsByEmployee: async (employeeId) => {
    try {
      const response = await apiClient.get(`/overtime/requests/employee/${employeeId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching overtime requests for employee ${employeeId}:`, error);
      throw error;
    }
  },
};

export default OTRequestService;
