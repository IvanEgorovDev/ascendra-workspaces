import { useState } from "react";
import { Box, Stack } from "@mui/material";
import useVmLoadDistribution from "../../../hooks/useVmLoadDistribution";
import useVmsUtilization from "../../../hooks/useVmsUtilization";
import { mono } from "../../../theme";
import RankedList from "./RankedList";
import type { RankedVm } from "./RankedList";
import TrendChart from "./TrendChart";

const periods = [
  { key: "7d", label: "Last 7 days" },
  { key: "14d", label: "Last 14 days" },
  { key: "30d", label: "Last 30 days" },
] as const;

type PeriodKey = (typeof periods)[number]["key"];

const periodDays: Record<PeriodKey, number> = {
  "7d": 7,
  "14d": 14,
  "30d": 30,
};

const FleetUtilizationPanel = () => {
  const [period, setPeriod] = useState<PeriodKey>("7d");

  const {
    cpuTrend,
    memoryTrend,
    currentCpu,
    peakCpu,
    currentMemory,
    peakMemory,
    utilizationLoading,
    utilizationError,
  } = useVmsUtilization(periodDays[period]);

  const { hottest, idlest, loadDistributionLoading, loadDistributionError } =
    useVmLoadDistribution(periodDays[period]);

  const toRankedVm = (summary: {
    vmName: string;
    avgCpuPercent: number;
  }): RankedVm => ({
    name: summary.vmName,
    value: summary.avgCpuPercent,
  });

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={0.5}>
        {periods.map((p) => (
          <Box
            key={p.key}
            component="button"
            onClick={() => setPeriod(p.key)}
            sx={{
              border: 1,
              borderColor: period === p.key ? "primary.main" : "divider",
              borderRadius: 1,
              bgcolor:
                period === p.key ? "rgba(255,180,84,0.1)" : "transparent",
              color: period === p.key ? "primary.main" : "text.secondary",
              fontFamily: mono,
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              px: 2,
              py: 0.875,
              cursor: "pointer",
              transition: "all 0.12s ease",
              "&:hover": { borderColor: "primary.main", color: "primary.main" },
            }}
          >
            {p.label}
          </Box>
        ))}
      </Stack>

      <Stack direction={{ xs: "column", lg: "row" }} spacing={2}>
        <TrendChart
          label="CPU utilization"
          values={cpuTrend}
          color="#ffb454"
          current={`${currentCpu}%`}
          peak={`${peakCpu}%`}
          isLoading={utilizationLoading}
          isError={Boolean(utilizationError)}
        />
        <TrendChart
          label="Memory utilization"
          values={memoryTrend}
          color="#7dd3fc"
          current={`${currentMemory}%`}
          peak={`${peakMemory}%`}
          isLoading={utilizationLoading}
          isError={Boolean(utilizationError)}
        />
      </Stack>

      <Stack direction={{ xs: "column", lg: "row" }} spacing={2}>
        <RankedList
          title="Hottest VMs"
          items={hottest.map(toRankedVm)}
          color="#ff6b6b"
          isLoading={loadDistributionLoading}
          isError={Boolean(loadDistributionError)}
        />
        <RankedList
          title="Most idle VMs"
          items={idlest.map(toRankedVm)}
          color="#4a5160"
          isLoading={loadDistributionLoading}
          isError={Boolean(loadDistributionError)}
        />
      </Stack>
    </Stack>
  );
};

export default FleetUtilizationPanel;
