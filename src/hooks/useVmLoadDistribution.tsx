import { useQuery } from "@tanstack/react-query";
import { getVmLoadDistribution } from "../api/mock/vm";
import APIClient from "../services/api-client";
import type { VmLoadSummary } from "../interfaces";

const loadDistributionClient = new APIClient<VmLoadSummary[], [days: number]>(
  getVmLoadDistribution,
);

const RANKED_LIST_SIZE = 4;

const byCpuDescending = (a: VmLoadSummary, b: VmLoadSummary) =>
  b.avgCpuPercent - a.avgCpuPercent;

const useVmLoadDistribution = (days: number) => {
  const {
    data: distribution = [],
    isLoading: loadDistributionLoading,
    error: loadDistributionError,
  } = useQuery({
    queryKey: ["vm-load-distribution", days],
    queryFn: () => loadDistributionClient.request(days),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const ranked = [...distribution].sort(byCpuDescending);

  const hottest = ranked.slice(0, RANKED_LIST_SIZE);
  const idlest = ranked.slice(RANKED_LIST_SIZE).slice(-RANKED_LIST_SIZE);

  return {
    distribution,
    loadDistributionLoading,
    loadDistributionError,
    hottest,
    idlest,
  };
};

export default useVmLoadDistribution;
