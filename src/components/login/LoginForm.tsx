import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import useLogin from "../../hooks/useLogin";
import AccountsHintTooltip from "./AccountsHintTooltip";
import type { User } from "../../interfaces";

interface Props {
  onSuccess: (user: User) => void;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginForm = ({ onSuccess }: Props) => {
  const [email, setEmail] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const { isPending, isError, error, mutate, reset } = useLogin();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (validationError) setValidationError(null);
    if (isError) reset();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();

    if (!EMAIL_PATTERN.test(trimmed)) {
      setValidationError("Enter a valid email address.");
      return;
    }

    mutate(trimmed, { onSuccess });
  };

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h5" component="h1">
          Sign in
        </Typography>
        <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
          <Typography variant="body2">
            Enter your work email to access your workspace.
          </Typography>
          <AccountsHintTooltip>
            <InfoOutlinedIcon
              fontSize="small"
              sx={{
                color: "text.secondary",
                cursor: "help",
                transition: "color 0.15s ease",
                "&:hover": { color: "primary.main" },
              }}
            />
          </AccountsHintTooltip>
        </Stack>
      </Stack>

      <Stack component="form" spacing={2} noValidate onSubmit={handleSubmit}>
        <TextField
          label="Email address"
          type="email"
          name="email"
          autoComplete="email"
          autoFocus
          fullWidth
          required
          placeholder="you@ascendra.dev"
          value={email}
          onChange={handleChange}
          disabled={isPending}
          error={Boolean(validationError)}
          helperText={validationError ?? " "}
        />

        {isError && (
          <Alert severity="error" variant="outlined" onClose={() => reset()}>
            {error?.message ?? "Something went wrong. Please try again."}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={isPending || email.trim().length === 0}
          startIcon={
            isPending ? (
              <CircularProgress
                size={16}
                thickness={5}
                sx={{ color: "inherit" }}
              />
            ) : undefined
          }
        >
          {isPending ? "Signing in" : "Continue"}
        </Button>
      </Stack>
    </Stack>
  );
};

export default LoginForm;
