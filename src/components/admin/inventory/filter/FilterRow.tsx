import CheckRounded from "@mui/icons-material/CheckRounded";
import { Box, Stack, Typography } from "@mui/material";

interface Props {
  label: string;
  checked: boolean;
  onClick: () => void;
}

const FilterRow = ({ label, checked, onClick }: Props) => (
  <Stack
    direction="row"
    spacing={1.25}
    onClick={onClick}
    sx={{
      alignItems: "center",
      px: 1,
      py: 0.625,
      borderRadius: 1,
      cursor: "pointer",
      "&:hover": { bgcolor: "action.hover" },
    }}
  >
    <Box
      sx={(theme) => ({
        width: 16,
        height: 16,
        flexShrink: 0,
        borderRadius: "4px",
        border: "1.5px solid",
        borderColor: checked
          ? theme.palette.primary.main
          : theme.palette.mode === "dark"
            ? "rgba(230,233,237,0.22)"
            : "rgba(29,32,39,0.22)",
        bgcolor: checked ? "primary.main" : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.12s ease",
      })}
    >
      {checked && (
        <CheckRounded sx={{ fontSize: 13, color: "primary.contrastText" }} />
      )}
    </Box>
    <Typography
      variant="body2"
      noWrap
      sx={{ color: checked ? "text.primary" : "text.secondary" }}
    >
      {label}
    </Typography>
  </Stack>
);

export default FilterRow;
