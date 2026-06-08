import { Stack, Tooltip, Typography, type TooltipProps } from "@mui/material";
import { users } from "../../api/mock/user";
import type { User } from "../../interfaces";

const roleLabel: Record<User["role"], string> = {
  admin: "Admin",
  engineer: "Engineer",
};

const usersByRole = users.reduce<Record<User["role"], User[]>>(
  (byRole, user) => {
    (byRole[user.role] ??= []).push(user);
    return byRole;
  },
  {} as Record<User["role"], User[]>,
);

interface AccountsHintTooltipProps {
  children: TooltipProps["children"];
}

const AccountsHintTooltip = ({ children }: AccountsHintTooltipProps) => (
  <Tooltip
    arrow
    placement="top-start"
    slotProps={{
      tooltip: {
        sx: (theme) => ({
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: `${theme.shape.borderRadius}px`,
          padding: 2,
          maxWidth: 300,
        }),
      },
      arrow: {
        sx: (theme) => ({
          color: theme.palette.background.paper,
          "&::before": {
            border: `1px solid ${theme.palette.divider}`,
          },
        }),
      },
    }}
    title={
      <Stack spacing={1.25}>
        <Typography variant="overline" color="primary">
          Demo accounts — use any of these emails
        </Typography>
        <Stack spacing={1.25}>
          {Object.entries(usersByRole).map(([role, roleUsers]) => (
            <Stack key={role} spacing={0.5}>
              <Typography variant="overline" color="text.secondary">
                {roleLabel[role as User["role"]]}
              </Typography>
              <Stack spacing={0.75} sx={{ pl: 0.25 }}>
                {roleUsers.map((user) => (
                  <Stack key={user.id} spacing={0.125}>
                    <Typography variant="body2" color="text.primary">
                      {user.name}
                    </Typography>
                    <Typography variant="body2">{user.email}</Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    }
  >
    {children}
  </Tooltip>
);

export default AccountsHintTooltip;
