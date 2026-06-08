import { Box } from "@mui/material";
import { mono } from "../../../theme";

const SpecChip = ({ label }: { label: string }) => (
  <Box
    sx={{
      border: 1,
      borderColor: "divider",
      borderRadius: 0.5,
      px: 1,
      py: 0.375,
      fontFamily: mono,
      fontSize: "0.75rem",
      color: "text.secondary",
      whiteSpace: "nowrap",
    }}
  >
    {label}
  </Box>
);

export default SpecChip;
