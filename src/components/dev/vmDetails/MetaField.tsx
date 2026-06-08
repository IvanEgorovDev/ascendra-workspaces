import { Stack, Typography } from "@mui/material";

interface Props {
  label: string;
  value: string;
}

const MetaField = ({ label, value }: Props) => (
  <Stack spacing={0.375} sx={{ minWidth: 0 }}>
    <Typography variant="monoLabel">{label}</Typography>
    <Typography
      variant="body2"
      sx={{ color: "text.primary", fontWeight: 600 }}
      noWrap
    >
      {value}
    </Typography>
  </Stack>
);

export default MetaField;
