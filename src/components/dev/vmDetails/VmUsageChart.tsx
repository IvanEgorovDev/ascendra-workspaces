import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipContentProps } from "recharts";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { mono } from "../../../theme";
import { CPU_COLOR, MEMORY_COLOR, formatClock } from "./format";
import type { VmUsagePoint } from "../../../interfaces";

interface Props {
  data: VmUsagePoint[];
  isLoading: boolean;
  isError: boolean;
}

const ChartTooltip = ({ active, payload }: TooltipContentProps) => {
  if (!active || !payload?.length) return null;

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        bgcolor: "background.paper",
        boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        px: 1.25,
        py: 0.75,
      }}
    >
      <Typography
        variant="caption"
        sx={{ display: "block", color: "text.secondary", mb: 0.25 }}
      >
        {formatClock(String(payload[0].payload.timestamp))}
      </Typography>
      {payload.map((entry) => (
        <Typography
          key={entry.dataKey as string}
          sx={{ fontFamily: mono, fontWeight: 700, color: entry.color }}
        >
          {entry.name}: {Number(entry.value)}%
        </Typography>
      ))}
    </Box>
  );
};

const VmUsageChart = ({ data, isLoading, isError }: Props) => {
  if (isError) {
    return (
      <Stack
        sx={{ height: 140, alignItems: "center", justifyContent: "center" }}
      >
        <Typography variant="body2" sx={{ color: "error.main" }}>
          Failed to load usage history
        </Typography>
      </Stack>
    );
  }

  if (isLoading) {
    return <Skeleton variant="rounded" sx={{ height: 140, borderRadius: 1 }} />;
  }

  return (
    <Box sx={{ height: 140 }}>
      <ResponsiveContainer width="100%" height={140}>
        <AreaChart
          data={data}
          margin={{ top: 4, right: 8, bottom: 0, left: -8 }}
        >
          <defs>
            <linearGradient id="vmCpuFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CPU_COLOR} stopOpacity={0.35} />
              <stop offset="95%" stopColor={CPU_COLOR} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="vmMemoryFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={MEMORY_COLOR} stopOpacity={0.3} />
              <stop offset="95%" stopColor={MEMORY_COLOR} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            vertical={false}
            stroke="rgba(230,233,237,0.5)"
            strokeDasharray="2 4"
          />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatClock}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
            tick={{ fontFamily: mono, fontSize: 10, fill: "#8a92a0" }}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 50, 100]}
            tickFormatter={(value) => `${value}%`}
            axisLine={false}
            tickLine={false}
            width={36}
            tick={{ fontFamily: mono, fontSize: 10, fill: "#8a92a0" }}
          />
          <Tooltip
            cursor={{
              stroke: "rgba(230,233,237,0.16)",
              strokeDasharray: "2 4",
            }}
            content={ChartTooltip}
          />
          <Area
            type="monotone"
            dataKey="cpuPercent"
            name="CPU"
            stroke={CPU_COLOR}
            strokeWidth={2}
            fill="url(#vmCpuFill)"
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="memoryPercent"
            name="Memory"
            stroke={MEMORY_COLOR}
            strokeWidth={2}
            fill="url(#vmMemoryFill)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default VmUsageChart;
