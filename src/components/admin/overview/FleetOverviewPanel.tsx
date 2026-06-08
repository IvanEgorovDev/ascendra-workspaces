import { Box, Paper, Skeleton, Stack, Typography } from "@mui/material";
import useFleetOverview, { statusMeta } from "../../../hooks/useFleetOverview";
import FleetStatCard from "./FleetStatCard";
import { mono } from "../../../theme";

const FleetOverviewPanel = () => {
  const {
    vmsLoading,
    vmsError,
    usersLoading,
    usersError,
    stats,
    statusBreakdown,
    totalVms,
  } = useFleetOverview();

  const sourceState = {
    vms: { isLoading: vmsLoading, isError: Boolean(vmsError) },
    users: { isLoading: usersLoading, isError: Boolean(usersError) },
  };

  const statusLoading = vmsLoading;
  const statusError = Boolean(vmsError);

  return (
    <Stack spacing={4}>
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          },
        }}
      >
        {[
          "Total VMs",
          "Active users",
          "Avg CPU utilization",
          "Avg memory utilization",
          "Hourly cost",
          "Projected monthly",
        ].map((label) => {
          const stat = stats.find((s) => s.label === label);
          const source = stat?.source ?? "vms";
          const { isLoading, isError } = sourceState[source];
          return (
            <FleetStatCard
              key={label}
              label={label}
              isLoading={isLoading}
              isError={isError}
              stat={stat}
            />
          );
        })}
      </Box>

      <Paper variant="outlined" sx={{ p: 2.5 }}>
        <Typography variant="monoLabel">Fleet status</Typography>

        {statusLoading ? (
          <>
            <Skeleton
              variant="rounded"
              sx={{ mt: 1.5, height: 10, borderRadius: 0.5 }}
            />
            <Stack
              direction="row"
              spacing={3}
              useFlexGap
              sx={{ mt: 2, flexWrap: "wrap" }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <Skeleton
                  key={i}
                  variant="text"
                  width={90}
                  sx={{ fontSize: "0.875rem" }}
                />
              ))}
            </Stack>
          </>
        ) : statusError ? (
          <Typography variant="body2" sx={{ mt: 1.5, color: "error.main" }}>
            Failed to load fleet status
          </Typography>
        ) : (
          <>
            <Stack
              direction="row"
              sx={{
                mt: 1.5,
                height: 10,
                borderRadius: 0.5,
                overflow: "hidden",
                border: 1,
                borderColor: "divider",
              }}
            >
              {statusBreakdown.map((segment) => (
                <Box
                  key={segment.status}
                  sx={{
                    width: `${(segment.count / totalVms) * 100}%`,
                    bgcolor: segment.color,
                  }}
                />
              ))}
            </Stack>

            <Stack
              direction="row"
              spacing={3}
              useFlexGap
              sx={{ mt: 2, flexWrap: "wrap" }}
            >
              {statusBreakdown.map((segment) => (
                <Stack
                  key={segment.status}
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center" }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor: segment.color,
                    }}
                  />
                  <Typography variant="body2" sx={{ color: "text.primary" }}>
                    {statusMeta[segment.status].label}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontFamily: mono, color: "text.secondary" }}
                  >
                    {segment.count}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </>
        )}
      </Paper>
    </Stack>
  );
};

export default FleetOverviewPanel;
