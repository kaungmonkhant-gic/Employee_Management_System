import overtimeService from "../services/overtimeService";

const overtimeController = {
  fetchOvertimeRequests: async () => {
    try {
      const records = await overtimeService.fetchOvertimeRequests();
      return records;
    } catch (error) {
      throw new Error("Failed to fetch overtime records. Please try again later.");
    }
  },

  addOvertimeRecord: async (overtimeData) => {
    try {
      const newRecord = await overtimeService.addOvertimeRecord(overtimeData);
      return newRecord;
    } catch (error) {
      throw new Error("Failed to add overtime record. Please try again later.");
    }
  },
};

export default overtimeController;
