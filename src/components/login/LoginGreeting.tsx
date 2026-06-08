import { Button, Stack, Typography } from "@mui/material";
import type { User } from "../../interfaces";

interface LoginGreetingProps {
  user: User;
  onContinue: () => void;
}

const roleCopy: Record<User["role"], string> = {
  admin: "Fleet administrator",
  engineer: "Engineer workspace",
};

const LoginGreeting = ({ user, onContinue }: LoginGreetingProps) => (
  <Stack spacing={3.5}>
    <Stack spacing={0.75}>
      <Typography variant="h5" component="h1">
        Welcome back, {user.name.split(" ")[0]}
      </Typography>
      <Typography variant="body2">
        Signed in as {user.email} - {roleCopy[user.role]}
      </Typography>
    </Stack>

    <Button
      fullWidth
      size="large"
      variant="contained"
      color="primary"
      onClick={onContinue}
    >
      Continue to workspace
    </Button>
  </Stack>
);

export default LoginGreeting;
