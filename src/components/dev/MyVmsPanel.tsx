import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { InputAdornment, Stack, TextField, Typography } from "@mui/material";

import MyVmsTable from "./MyVmsTable";
import useMyVms from "../../hooks/useMyVms";

const MyVmsPanel = () => {
  const {
    vms: filteredVms,
    vmsLoading,
    vmsError,
    search,
    setSearch,
  } = useMyVms();

  return (
    <Stack spacing={2.5}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={{ alignItems: { sm: "center" }, justifyContent: "space-between" }}
      >
        <TextField
          placeholder="Search by name, template, or region…"
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
      </Stack>

      <MyVmsTable
        vms={filteredVms}
        vmsLoading={vmsLoading}
        vmsError={vmsError}
      />

      <Typography variant="caption" sx={{ color: "text.secondary" }}>
        {vmsLoading
          ? "Loading your VMs…"
          : `Showing ${filteredVms.length} VM${filteredVms.length === 1 ? "" : "s"}`}
      </Typography>
    </Stack>
  );
};

export default MyVmsPanel;
