import { Box } from "@mui/material";
import useRequireRole from "../hooks/useRequireRole";
import DashboardHeader from "../components/layout/DashboardHeader";
import MyVmsPanel from "../components/dev/MyVmsPanel";

const DevPage = () => {
  const user = useRequireRole("engineer");

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <DashboardHeader />

      <Box
        component="main"
        sx={{
          px: { xs: 2, md: 4 },
          py: 4,
          maxWidth: 1440,
          mx: "auto",
        }}
      >
        <MyVmsPanel />
      </Box>
    </Box>
  );
};

export default DevPage;
