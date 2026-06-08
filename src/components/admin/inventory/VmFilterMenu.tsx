import { useState } from "react";
import type { MouseEvent } from "react";
import FilterAltRounded from "@mui/icons-material/FilterAltRounded";
import { Badge, Box, Button, Divider, Popover, Stack, Typography, alpha } from "@mui/material";
import type {
  VmFilterCategory,
  VmFilters,
} from "../../../hooks/useVmInventory";
import { mono } from "../../../theme";
import FilterSection from "./filter/FilterSection";

interface Props {
  filterOptions: Record<VmFilterCategory, string[]>;
  filters: VmFilters;
  onToggle: (category: VmFilterCategory, value: string) => void;
  onClear: () => void;
  activeCount: number;
}

const sections: { category: VmFilterCategory; label: string }[] = [
  { category: "name", label: "VM Name" },
  { category: "owner", label: "Owner" },
  { category: "region", label: "Region" },
];

const VmFilterMenu = ({
  filterOptions,
  filters,
  onToggle,
  onClear,
  activeCount,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Badge
        color="primary"
        variant="dot"
        invisible={activeCount === 0}
        sx={{ "& .MuiBadge-badge": { right: 8, top: 8 } }}
      >
        <Button
          onClick={handleOpen}
          variant="outlined"
          size="small"
          startIcon={<FilterAltRounded sx={{ fontSize: 18 }} />}
          sx={(theme) => ({
            color: open || activeCount > 0 ? "primary.main" : "text.secondary",
            borderColor:
              open || activeCount > 0 ? "primary.main" : theme.palette.divider,
            fontFamily: mono,
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            py: 0.875,
            px: 1.5,
            "&:hover": {
              borderColor: "primary.main",
              bgcolor: alpha(theme.palette.primary.main, 0.08),
            },
          })}
        >
          Filter{activeCount > 0 ? ` · ${activeCount}` : ""}
        </Button>
      </Badge>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            variant: "outlined",
            sx: {
              mt: 1,
              borderRadius: 1.5,
              bgcolor: "background.paper",
              boxShadow: "0 16px 48px rgba(0,0,0,0.45)",
            },
          },
        }}
      >
        <Stack sx={{ width: { xs: 280, sm: 540 }, maxWidth: "92vw" }}>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              pt: 1.75,
              pb: 1,
            }}
          >
            <Typography
              sx={{
                fontFamily: mono,
                fontSize: "0.7rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "text.secondary",
              }}
            >
              Filter inventory
            </Typography>
            {activeCount > 0 && (
              <Typography
                onClick={onClear}
                variant="caption"
                sx={{
                  color: "primary.main",
                  cursor: "pointer",
                  fontWeight: 600,
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Clear all
              </Typography>
            )}
          </Stack>
          <Divider />
          <Stack
            direction={{ xs: "column", sm: "row" }}
            divider={
              <Divider
                orientation="vertical"
                flexItem
                sx={{ display: { xs: "none", sm: "block" } }}
              />
            }
            sx={{ px: 1.5, py: 1.5 }}
            spacing={{ xs: 1.5, sm: 0 }}
          >
            {sections.map(({ category, label }) => (
              <Box key={category} sx={{ flex: 1, px: { sm: 1 }, minWidth: 0 }}>
                <FilterSection
                  label={label}
                  values={filterOptions[category]}
                  selected={filters[category]}
                  onToggle={(value) => onToggle(category, value)}
                />
              </Box>
            ))}
          </Stack>
        </Stack>
      </Popover>
    </>
  );
};

export default VmFilterMenu;
