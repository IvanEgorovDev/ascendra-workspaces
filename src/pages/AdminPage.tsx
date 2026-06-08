import { useState, type SyntheticEvent } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import useRequireRole from "../hooks/useRequireRole";
import DashboardHeader from "../components/layout/DashboardHeader";
import FleetOverviewPanel from "../components/admin/overview/FleetOverviewPanel";
import VmInventoryPanel from "../components/admin/inventory/VmInventoryPanel";
import FleetUtilizationPanel from "../components/admin/utilization/FleetUtilizationPanel";
import TemplatesPanel from "../components/admin/templates/TemplatesPanel";
import { mono } from "../theme";

const tabs = [
  { label: "Fleet overview", panel: FleetOverviewPanel },
  { label: "VM inventory", panel: VmInventoryPanel },
  { label: "Fleet utilization", panel: FleetUtilizationPanel },
  { label: "Templates", panel: TemplatesPanel },
];

const AdminPage = () => {
  const user = useRequireRole("admin");
  const [tabIndex, setTabIndex] = useState(0);

  if (!user) {
    return null;
  }

  const handleTabChange = (_event: SyntheticEvent, value: number) => {
    setTabIndex(value);
  };

  const ActivePanel = tabs[tabIndex].panel;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <DashboardHeader />

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons={false}
        sx={{
          px: { xs: 2, md: 4 },
          borderBottom: 1,
          borderColor: "divider",
          minHeight: 0,
          "& .MuiTabs-indicator": {
            height: 2,
            bgcolor: "primary.main",
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.label}
            label={tab.label}
            sx={{
              fontFamily: mono,
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              minHeight: 0,
              py: 2,
              px: 2.5,
              color: "text.secondary",
              "&.Mui-selected": { color: "primary.main" },
            }}
          />
        ))}
      </Tabs>

      <Box
        component="main"
        sx={{
          px: { xs: 2, md: 4 },
          py: 4,
          maxWidth: 1440,
          mx: "auto",
        }}
      >
        <ActivePanel />
      </Box>
    </Box>
  );
};

export default AdminPage;
