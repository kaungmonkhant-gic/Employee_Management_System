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

  markAsPaid : async (id) => {
    try {
      await overtimeService.markAsPaid(id);
      return { success: true, message: "Overtime marked as paid successfully!" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  // addOvertimeRecord: async (overtimeData) => {
  //   try {
  //     const newRecord = await overtimeService.createOvertimeRecord(overtimeData);
  //     return newRecord;
  //   } catch (error) {
  //     throw new Error("Failed to add overtime record. Please try again later.");
  //   }
  // },
};

export default overtimeController;
