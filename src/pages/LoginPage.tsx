import { Box, Stack, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";
import LoginGreeting from "../components/login/LoginGreeting";
import LoginForm from "../components/login/LoginForm";
import { useNavigate } from "@tanstack/react-router";
import useAuth from "../hooks/useAuth";
import type { User } from "../interfaces";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LoginPage = () => {
  const { user, setUser } = useAuth();

  const navigate = useNavigate();

  const handleAuth = (user: User) => {
    navigate({ to: user.role === "admin" ? "/admin" : "/dev" });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
        py: 8,
      }}
    >
      <Stack spacing={3.5} sx={{ width: "100%", maxWidth: 400 }}>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "baseline",
            justifyContent: "center",
            animation: `${fadeIn} 0.4s ease both`,
          }}
        >
          <Typography variant="overline">Ascendra Workspaces</Typography>
        </Stack>

        <Box
          sx={(theme) => ({
            width: "100%",
            padding: 5,
            borderRadius: 2,
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            animation: `${fadeIn} 0.4s 0.06s ease both`,
            [theme.breakpoints.down("sm")]: {
              padding: 3,
            },
          })}
        >
          {user ? (
            <LoginGreeting user={user} onContinue={() => handleAuth(user)} />
          ) : (
            <LoginForm onSuccess={setUser} />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default LoginPage;
