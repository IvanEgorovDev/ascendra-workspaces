import { useState, type MouseEvent } from "react";
import {
  Badge,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import LaunchRoundedIcon from "@mui/icons-material/LaunchRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import StopRoundedIcon from "@mui/icons-material/StopRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { mono } from "../../theme";
import type { VM } from "../../interfaces";
import useConnectVM from "../../hooks/useConnectVM";
import useStartVM from "../../hooks/useStartVM";
import useStopVM from "../../hooks/useStopVM";
import useRestartVM from "../../hooks/useRestartVM";
import VmDetailsModal from "./vmDetails/VmDetailsModal";

interface Props {
  vm: VM;
}

const menuItemSx = {
  fontFamily: mono,
  fontSize: "0.8125rem",
  gap: 0.5,
};

const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong";

const VmActionsMenu = ({ vm }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const open = Boolean(anchorEl);

  const connectVm = useConnectVM();
  const startVm = useStartVM();
  const stopVm = useStopVM();
  const restartVm = useRestartVM();

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setAnchorEl(null);
  };

  const handleConnect = () => {
    handleClose();
    connectVm.mutate(vm.id, {
      onSuccess: (session) => window.open(session.url, "_blank", "noopener"),
    });
  };

  const handleStart = () => {
    handleClose();
    startVm.mutate(vm.id);
  };

  const handleStop = () => {
    handleClose();
    stopVm.mutate(vm.id);
  };

  const handleRestart = () => {
    handleClose();
    restartVm.mutate(vm.id);
  };

  const handleViewDetails = () => {
    handleClose();
    setDetailsOpen(true);
  };

  const isRunning = vm.status === "running";
  const isStopped = vm.status === "stopped";
  const isBusy =
    connectVm.isPending ||
    startVm.isPending ||
    stopVm.isPending ||
    restartVm.isPending;

  const failedAction = [connectVm, startVm, stopVm, restartVm].find(
    (mutation) => mutation.isError,
  );

  return (
    <>
      <Tooltip
        title={failedAction ? errorMessage(failedAction.error) : ""}
        disableHoverListener={!failedAction}
      >
        <span>
          <IconButton
            size="small"
            onClick={handleOpen}
            disabled={isBusy}
            aria-label={`Actions for ${vm.name}`}
            sx={{
              color: "text.secondary",
              "&:hover": { color: "primary.main" },
            }}
          >
            <Badge
              variant="dot"
              color="error"
              invisible={!failedAction}
              overlap="circular"
            >
              <MoreVertRoundedIcon fontSize="small" />
            </Badge>
          </IconButton>
        </span>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            variant: "outlined",
            sx: { minWidth: 200 },
          },
        }}
      >
        <MenuItem onClick={handleConnect} disabled={!isRunning} sx={menuItemSx}>
          <ListItemIcon sx={{ color: "inherit", minWidth: 0 }}>
            <LaunchRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Connect</ListItemText>
        </MenuItem>

        {isStopped ? (
          <MenuItem onClick={handleStart} sx={menuItemSx}>
            <ListItemIcon sx={{ color: "primary.main", minWidth: 0 }}>
              <PlayArrowRoundedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Start</ListItemText>
          </MenuItem>
        ) : (
          <MenuItem onClick={handleStop} disabled={!isRunning} sx={menuItemSx}>
            <ListItemIcon sx={{ color: "inherit", minWidth: 0 }}>
              <StopRoundedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Stop</ListItemText>
          </MenuItem>
        )}

        <MenuItem onClick={handleRestart} disabled={!isRunning} sx={menuItemSx}>
          <ListItemIcon sx={{ color: "inherit", minWidth: 0 }}>
            <RestartAltRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Restart</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleViewDetails} sx={menuItemSx}>
          <ListItemIcon sx={{ color: "inherit", minWidth: 0 }}>
            <InfoOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>VM details</ListItemText>
        </MenuItem>
      </Menu>

      <VmDetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        vm={vm}
      />
    </>
  );
};

export default VmActionsMenu;
