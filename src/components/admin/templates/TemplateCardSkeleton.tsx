import { Skeleton, Stack } from "@mui/material";

const TemplateCardSkeleton = () => (
  <Stack
    spacing={2}
    sx={{
      border: 1,
      borderColor: "divider",
      borderRadius: 1,
      bgcolor: "background.paper",
      p: 2.5,
    }}
  >
    <Stack spacing={0.5}>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "baseline" }}
      >
        <Skeleton variant="text" width={120} sx={{ fontSize: "1.25rem" }} />
        <Skeleton variant="text" width={80} sx={{ fontSize: "0.75rem" }} />
      </Stack>
      <Skeleton variant="text" width="80%" sx={{ fontSize: "0.875rem" }} />
    </Stack>
    <Stack direction="row" spacing={1}>
      <Skeleton variant="rounded" width={70} height={26} />
      <Skeleton variant="rounded" width={90} height={26} />
      <Skeleton variant="rounded" width={80} height={26} />
    </Stack>
    <Stack spacing={0.75}>
      <Skeleton variant="text" width={90} sx={{ fontSize: "0.75rem" }} />
      <Stack direction="row" spacing={1}>
        <Skeleton variant="rounded" width={90} height={22} />
        <Skeleton variant="rounded" width={70} height={22} />
        <Skeleton variant="rounded" width={60} height={22} />
      </Stack>
    </Stack>
  </Stack>
);

export default TemplateCardSkeleton;
