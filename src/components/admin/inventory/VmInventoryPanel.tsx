import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { InputAdornment, Stack, TextField, Typography } from "@mui/material";
import useVmInventory from "../../../hooks/useVmInventory";
import VmFilterMenu from "./VmFilterMenu";
import VmsTable from "./VmsTable";

const VmInventoryPanel = () => {
  const {
    vms,
    vmsLoading,
    vmsError,
    search,
    setSearch,
    filterOptions,
    filters,
    toggleFilter,
    clearFilters,
    activeFilterCount,
  } = useVmInventory();

  return (
    <Stack spacing={2.5}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={{ alignItems: { sm: "center" }, justifyContent: "space-between" }}
      >
        <TextField
          placeholder="Search by name, owner, or region…"
          size="small"
          sx={{ width: { xs: "100%", sm: 340 } }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon
                    fontSize="small"
                    sx={{ color: "text.secondary" }}
                  />
                </InputAdornment>
              ),
            },
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <VmFilterMenu
          filterOptions={filterOptions}
          filters={filters}
          onToggle={toggleFilter}
          onClear={clearFilters}
          activeCount={activeFilterCount}
        />
      </Stack>

      <VmsTable vms={vms} vmsLoading={vmsLoading} vmsError={vmsError} />

      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {vmsLoading
          ? "Loading VMs…"
          : `Showing ${vms.length} VM${vms.length === 1 ? "" : "s"} fleet-wide`}
      </Typography>
    </Stack>
  );
};

export default VmInventoryPanel;
