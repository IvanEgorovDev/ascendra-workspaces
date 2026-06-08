import { useQuery } from "@tanstack/react-query";
import { getUtilizationHistory } from "../api/mock/vm";
import APIClient from "../services/api-client";
import type { UtilizationTrendPoint } from "../interfaces";

const utilizationClient = new APIClient<
  UtilizationTrendPoint[],
  [days: number]
>(getUtilizationHistory);

const getPeakValue = (values: number[]) =>
  values.length ? Math.max(...values) : 0;

const useVmsUtilization = (days: number) => {
  const {
    data: trend = [],
    isLoading: utilizationLoading,
    error: utilizationError,
  } = useQuery({
    queryKey: ["vms-utilization", days],
    queryFn: () => utilizationClient.request(days),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const cpuTrend = trend.map((point) => point.cpuPercent);
  const memoryTrend = trend.map((point) => point.memoryPercent);

  return {
    trend,
    utilizationLoading,
    utilizationError,
    cpuTrend,
    memoryTrend,
    currentCpu: cpuTrend.at(-1) ?? 0,
    peakCpu: getPeakValue(cpuTrend),
    currentMemory: memoryTrend.at(-1) ?? 0,
    peakMemory: getPeakValue(memoryTrend),
  };
};

export default useVmsUtilization;
