import salaryService from "../Service/SalaryService";

const salaryController = {
  fetchSalaryHistory: async () => {
    try {
      const records = await salaryService.fetchSalaryHistory();
      return records;
    } catch (error) {
      throw new Error("Failed to fetch salary history. Please try again later.");
    }
  },
};

export default salaryController;
