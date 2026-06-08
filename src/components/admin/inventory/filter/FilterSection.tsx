import { Stack, Typography } from "@mui/material";
import { mono } from "../../../../theme";
import FilterRow from "./FilterRow";

interface Props {
  label: string;
  values: string[];
  selected: Set<string>;
  onToggle: (value: string) => void;
}

const FilterSection = ({ label, values, selected, onToggle }: Props) => (
  <Stack spacing={0.5} sx={{ minWidth: 0 }}>
    <Typography
      sx={{
        fontFamily: mono,
        fontSize: "0.7rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "text.secondary",
        px: 1,
      }}
    >
      {label}
    </Typography>
    <Stack
      sx={{
        maxHeight: 184,
        overflowY: "auto",
        "&::-webkit-scrollbar": { width: 6 },
        "&::-webkit-scrollbar-thumb": {
          bgcolor: "rgba(230,233,237,0.14)",
          borderRadius: 3,
        },
      }}
    >
      {values.length === 0 ? (
        <Typography
          variant="caption"
          sx={{ color: "text.secondary", px: 1, py: 0.5 }}
        >
          No values
        </Typography>
      ) : (
        values.map((value) => (
          <FilterRow
            key={value}
            label={value}
            checked={selected.has(value)}
            onClick={() => onToggle(value)}
          />
        ))
      )}
    </Stack>
  </Stack>
);

export default FilterSection;
