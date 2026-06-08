import { Box, Stack, Typography } from "@mui/material";

const UtilizationBar = ({ value }: { value: number }) => (
  <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
    <Box
      sx={{
        width: 56,
        height: 5,
        borderRadius: 2,
        bgcolor: "rgba(230,233,237,0.5)",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: `${value}%`,
          height: "100%",
          bgcolor:
            value >= 75 ? "#ff6b6b" : value >= 20 ? "#ffb454" : "#4a5160",
        }}
      />
    </Box>
    <Typography variant="monoLabel">{value}%</Typography>
  </Stack>
);

export default UtilizationBar;
