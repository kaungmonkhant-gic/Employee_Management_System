import overtimeService from "../services/overtimeService";

const overtimeController = {
  fetchOvertimeRecords: async () => {
    try {
      const records = await overtimeService.getOvertimeRecords();
      return records;
    } catch (error) {
      throw new Error("Failed to fetch overtime records. Please try again later.");
    }
  },

  addOvertimeRecord: async (overtimeData) => {
    try {
      const newRecord = await overtimeService.createOvertimeRecord(overtimeData);
      return newRecord;
    } catch (error) {
      throw new Error("Failed to add overtime record. Please try again later.");
    }
  },
};

export default overtimeController;
