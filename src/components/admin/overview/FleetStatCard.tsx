import { Paper, Skeleton, Typography } from "@mui/material";
import type { StatTile } from "../../../hooks/useFleetOverview";
import { mono } from "../../../theme";

interface Props {
  label: string;
  isLoading: boolean;
  isError: boolean;
  stat?: StatTile;
}

const FleetStatCard = ({ label, isLoading, isError, stat }: Props) => (
  <Paper variant="outlined" sx={{ p: 2.5 }}>
    <Typography variant="monoLabel">{label}</Typography>

    {isLoading ? (
      <>
        <Skeleton
          variant="text"
          width={88}
          sx={{ fontSize: "1.875rem", mt: 0.5 }}
        />
        <Skeleton variant="text" width={150} sx={{ fontSize: "0.875rem" }} />
      </>
    ) : isError ? (
      <>
        <Typography
          sx={{
            fontFamily: mono,
            fontWeight: 700,
            fontSize: "1.875rem",
            lineHeight: 1.3,
            mt: 0.5,
            color: "error.main",
          }}
        >
          —
        </Typography>
        <Typography variant="body2" sx={{ color: "error.main" }}>
          Failed to load
        </Typography>
      </>
    ) : (
      <>
        <Typography
          sx={{
            fontFamily: mono,
            fontWeight: 700,
            fontSize: "1.875rem",
            lineHeight: 1.3,
            mt: 0.5,
          }}
        >
          {stat?.value}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {stat?.meta}
        </Typography>
      </>
    )}
  </Paper>
);

export default FleetStatCard;
