import managerOTService from "../Service/managerOTService";

const managerOTController = {
  fetchOvertimeRequests: async () => {
    try {
      const records = await managerOTService.fetchOvertimeRequests();
      return records;
    } catch (error) {
      throw new Error("Failed to fetch overtime records. Please try again later.");
    }
  },

  addOvertimeRecord: async (overtimeData) => {
    try {
      const newRecord = await managerOTService.addOvertimeRecord(overtimeData);
      return newRecord;
    } catch (error) {
      throw new Error("Failed to add overtime record. Please try again later.");
    }
  },
};

export default managerOTController;
