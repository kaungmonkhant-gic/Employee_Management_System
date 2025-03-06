import OTRequestService from "../Service/otRequestService";


const OTRequestController = {

    fetchLeaveCounts: async (setPending, setApproved, setRejected) => {
        try {
          const data = await OTRequestService.getOTCounts();
          setPending(data.PENDING);
          setApproved(data.APPROVED);
          setRejected(data.REJECTED);
        } catch (error) {
          console.error("Failed to fetch leave counts", error);
        }
      },
    };

    export default OTRequestController;