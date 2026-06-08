import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  YAxis,
} from "recharts";
import type { TooltipContentProps } from "recharts";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { mono } from "../../../theme";

interface Props {
  label: string;
  values: number[];
  color: string;
  current: string;
  peak: string;
  isLoading: boolean;
  isError: boolean;
}

const ChartTooltip = ({
  active,
  payload,
  color,
}: TooltipContentProps & { color: string }) => {
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
      <Typography sx={{ fontFamily: mono, fontWeight: 700, color }}>
        {Number(payload[0].value)}%
      </Typography>
    </Box>
  );
};

const renderTooltip = (color: string) => (props: TooltipContentProps) => (
  <ChartTooltip {...props} color={color} />
);

const TrendChart = ({
  label,
  values,
  color,
  current,
  peak,
  isLoading,
  isError,
}: Props) => {
  const chartData = values.map((value, index) => ({ index, value }));

  return (
    <Box
      sx={{
        flex: 1,
        minWidth: 280,
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        bgcolor: "background.paper",
        p: 2.5,
      }}
    >
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
      >
        <Typography
          variant="caption"
          sx={{
            fontFamily: mono,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "text.secondary",
          }}
        >
          {label}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Stack sx={{ alignItems: "flex-end" }}>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              current
            </Typography>
            {isLoading ? (
              <Skeleton variant="text" width={40} sx={{ fontSize: "1rem" }} />
            ) : (
              <Typography sx={{ fontFamily: mono, fontWeight: 700 }}>
                {current}
              </Typography>
            )}
          </Stack>
          <Stack sx={{ alignItems: "flex-end" }}>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              peak
            </Typography>
            {isLoading ? (
              <Skeleton variant="text" width={40} sx={{ fontSize: "1rem" }} />
            ) : (
              <Typography
                sx={{
                  fontFamily: mono,
                  fontWeight: 700,
                  color: "text.secondary",
                }}
              >
                {peak}
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>

      {isError ? (
        <Stack
          sx={{
            height: 120,
            mt: 3,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "error.main" }}>
            Failed to load utilization trend
          </Typography>
        </Stack>
      ) : isLoading ? (
        <Stack
          direction="row"
          spacing={0.75}
          sx={{ height: 120, mt: 3, alignItems: "flex-end" }}
        >
          {Array.from({ length: 12 }, (_, index) => (
            <Skeleton
              key={index}
              variant="rounded"
              sx={{
                flex: 1,
                height: 32 + ((index * 37) % 70),
                borderRadius: "2px 2px 0 0",
              }}
            />
          ))}
        </Stack>
      ) : (
        <Box sx={{ height: 120, mt: 3 }}>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart
              data={chartData}
              margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              barCategoryGap="22%"
            >
              <CartesianGrid
                vertical={false}
                stroke="rgba(230,233,237,0.5)"
                strokeDasharray="2 4"
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tickFormatter={(value) => `${value}%`}
                axisLine={false}
                tickLine={false}
                width={34}
                tick={{ fontFamily: mono, fontSize: 10, fill: "#8a92a0" }}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
                content={renderTooltip(color)}
              />
              <Bar
                dataKey="value"
                radius={[2, 2, 0, 0]}
                isAnimationActive={false}
              >
                {chartData.map((point, index) => (
                  <Cell
                    key={point.index}
                    fill={color}
                    fillOpacity={index === chartData.length - 1 ? 1 : 0.45}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
      <Stack direction="row" sx={{ mt: 1, justifyContent: "space-between" }}>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {values.length || 12} days ago
        </Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          now
        </Typography>
      </Stack>
    </Box>
  );
};

export default TrendChart;
