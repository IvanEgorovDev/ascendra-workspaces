import {
  Box,
  Chip,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import UtilizationBar from "./UtilizationBar";
import type { VM, VMStatus } from "../../../interfaces";
import { mono } from "../../../theme";
import useAllUsers from "../../../hooks/useAllUsers";

interface Props {
  vms: VM[];
  vmsLoading: boolean;
  vmsError: Error | null;
}

const statusStyles: Record<VMStatus, { color: string; label: string }> = {
  running: { color: "#ffb454", label: "Running" },
  starting: { color: "#7dd3fc", label: "Starting" },
  stopping: { color: "#5b8cad", label: "Stopping" },
  stopped: { color: "#4a5160", label: "Stopped" },
  error: { color: "#ff6b6b", label: "Error" },
};

const columns = [
  "VM",
  "Owner",
  "Template",
  "Status",
  "CPU",
  "Memory",
  "Disk",
  "Region",
  "Cost / hr",
];

const IDLE_THRESHOLD_MS = 15 * 60 * 1000;

const isIdle = (vm: VM) =>
  vm.status === "running" &&
  Date.now() - new Date(vm.lastActiveAt).getTime() > IDLE_THRESHOLD_MS;

const SkeletonRow = () => (
  <TableRow>
    {columns.map((header) => (
      <TableCell key={header} sx={{ borderColor: "divider" }}>
        <Skeleton variant="text" sx={{ fontSize: "0.8125rem" }} />
      </TableCell>
    ))}
  </TableRow>
);

const VmsTable = ({ vms, vmsLoading, vmsError }: Props) => {
  const { data: users = [] } = useAllUsers();

  const ownerNameById = new Map(users.map((user) => [user.id, user.name]));

  return (
    <TableContainer sx={{ border: 1, borderColor: "divider", borderRadius: 1 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((header) => (
              <TableCell
                key={header}
                sx={{
                  fontFamily: mono,
                  fontSize: "0.7rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "text.secondary",
                  borderColor: "divider",
                  whiteSpace: "nowrap",
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {vmsLoading ? (
            [0, 1, 2, 3, 4].map((i) => <SkeletonRow key={i} />)
          ) : vmsError ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                sx={{ borderColor: "divider", color: "error.main" }}
              >
                Failed to load VM inventory
              </TableCell>
            </TableRow>
          ) : vms.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                sx={{ borderColor: "divider", color: "text.secondary" }}
              >
                No VMs found
              </TableCell>
            </TableRow>
          ) : (
            vms.map((vm) => (
              <TableRow
                key={vm.id}
                sx={{ "&:last-of-type td": { borderBottom: 0 } }}
              >
                <TableCell sx={{ borderColor: "divider" }}>
                  <Stack spacing={0.25}>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center" }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: "text.primary", fontWeight: 600 }}
                      >
                        {vm.name}
                      </Typography>
                      {isIdle(vm) && (
                        <Chip
                          label="Idle"
                          size="small"
                          sx={{
                            height: 18,
                            fontSize: "0.625rem",
                            fontFamily: mono,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            bgcolor: "rgba(255,180,84,0.12)",
                            color: "primary.main",
                          }}
                        />
                      )}
                    </Stack>
                    <Typography
                      variant="caption"
                      sx={{ fontFamily: mono, color: "text.secondary" }}
                    >
                      {vm.id}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell
                  sx={{ borderColor: "divider", color: "text.secondary" }}
                >
                  {ownerNameById.get(vm.ownerId) ?? vm.ownerId}
                </TableCell>
                <TableCell
                  sx={{ borderColor: "divider", color: "text.secondary" }}
                >
                  {vm.templateId}
                </TableCell>
                <TableCell sx={{ borderColor: "divider" }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: "center" }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: statusStyles[vm.status].color,
                      }}
                    />
                    <Typography variant="body2">
                      {statusStyles[vm.status].label}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell sx={{ borderColor: "divider" }}>
                  <UtilizationBar value={vm.cpuUsagePercent} />
                </TableCell>
                <TableCell sx={{ borderColor: "divider" }}>
                  <UtilizationBar value={vm.memoryUsagePercent} />
                </TableCell>
                <TableCell sx={{ borderColor: "divider" }}>
                  <UtilizationBar value={vm.diskUsagePercent} />
                </TableCell>
                <TableCell
                  sx={{
                    borderColor: "divider",
                    fontFamily: mono,
                    fontSize: "0.8125rem",
                    color: "text.secondary",
                    whiteSpace: "nowrap",
                  }}
                >
                  {vm.region}
                </TableCell>
                <TableCell
                  sx={{
                    borderColor: "divider",
                    fontFamily: mono,
                    fontSize: "0.8125rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  ${vm.hourlyCost.toFixed(2)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VmsTable;
