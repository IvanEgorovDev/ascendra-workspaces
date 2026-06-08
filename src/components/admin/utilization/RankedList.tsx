import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { mono } from "../../../theme";

export interface RankedVm {
  name: string;
  value: number;
}

interface Props {
  title: string;
  items: RankedVm[];
  color: string;
  isLoading: boolean;
  isError: boolean;
}

const RankedList = ({ title, items, color, isLoading, isError }: Props) => (
  <Box
    sx={{
      flex: 1,
      minWidth: 260,
      border: 1,
      borderColor: "divider",
      borderRadius: 1,
      bgcolor: "background.paper",
      p: 2.5,
    }}
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
      {title}
    </Typography>
    <Stack spacing={1.5} sx={{ mt: 2 }}>
      {isError ? (
        <Typography variant="body2" sx={{ color: "error.main" }}>
          Failed to load VM ranking
        </Typography>
      ) : isLoading ? (
        Array.from({ length: 4 }, (_, i) => (
          <Stack key={i} spacing={0.5}>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Skeleton
                variant="text"
                width={140}
                sx={{ fontSize: "0.875rem" }}
              />
              <Skeleton
                variant="text"
                width={28}
                sx={{ fontSize: "0.875rem" }}
              />
            </Stack>
            <Skeleton variant="rounded" sx={{ height: 5, borderRadius: 2 }} />
          </Stack>
        ))
      ) : items.length === 0 ? (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          No VMs to show
        </Typography>
      ) : (
        items.map((item) => (
          <Stack key={item.name} spacing={0.5}>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography variant="body2" sx={{ color: "text.primary" }}>
                {item.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontFamily: mono, color: "text.secondary" }}
              >
                {item.value}%
              </Typography>
            </Stack>
            <Box
              sx={{
                height: 5,
                borderRadius: 2,
                bgcolor: "rgba(230,233,237,0.5)",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{ width: `${item.value}%`, height: "100%", bgcolor: color }}
              />
            </Box>
          </Stack>
        ))
      )}
    </Stack>
  </Box>
);

export default RankedList;
