import { Box, Stack, Typography } from "@mui/material";
import { useRouterState } from "@tanstack/react-router";
import useAuth from "../../hooks/useAuth";
import { mono } from "../../theme";
import ColorModeToggle from "./ColorModeToggle";

interface RouteHeading {
  eyebrow: string;
  title: string;
  roleLabel: string;
}

const routeHeadings: Record<string, RouteHeading> = {
  "/admin": {
    eyebrow: "Ascendra Workspaces — Admin Console",
    title: "Fleet command",
    roleLabel: "Fleet administrator",
  },
  "/dev": {
    eyebrow: "Ascendra Workspaces — Engineer Console",
    title: "Workspace overview",
    roleLabel: "Engineer",
  },
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const DashboardHeader = () => {
  const { user } = useAuth();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (!user) {
    return null;
  }

  const heading = routeHeadings[pathname] ?? {
    eyebrow: "Ascendra Workspaces",
    title: "Dashboard",
    roleLabel: user.role,
  };

  return (
    <Box
      component="header"
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        px: { xs: 2, md: 4 },
        py: 2.5,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        useFlexGap
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Stack spacing={0.25}>
          <Typography variant="overline" sx={{ color: "text.secondary" }}>
            {heading.eyebrow}
          </Typography>
          <Typography variant="h5" component="h1">
            {heading.title}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <ColorModeToggle />

          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 1,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: mono,
              fontWeight: 700,
              fontSize: "0.8125rem",
            }}
          >
            {initials(user.name)}
          </Box>
          <Stack spacing={0}>
            <Typography
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600, lineHeight: 1.3 }}
            >
              {user.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontFamily: mono,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "text.secondary",
              }}
            >
              {heading.roleLabel}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default DashboardHeader;
