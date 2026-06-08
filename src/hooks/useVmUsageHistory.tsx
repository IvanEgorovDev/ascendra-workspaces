import { useQuery } from "@tanstack/react-query";
import { getVmUsageHistory } from "../api/mock/vm";
import APIClient from "../services/api-client";
import type { VmUsagePoint } from "../interfaces";

const usageHistoryClient = new APIClient<
  VmUsagePoint[],
  [vmId: string, points?: number]
>(getVmUsageHistory);

const useVmUsageHistory = (vmId: string) => {
  return useQuery({
    queryKey: ["vm-usage-history", vmId],
    queryFn: () => usageHistoryClient.request(vmId),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export default useVmUsageHistory;
