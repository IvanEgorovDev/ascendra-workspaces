import { useState } from "react";
import { Box, DialogContent, IconButton, Stack, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { mono } from "../../../theme";
import UtilizationBar from "../../admin/inventory/UtilizationBar";
import useAllVMTemplates from "../../../hooks/useAllVMTemplates";
import useVmUsageHistory from "../../../hooks/useVmUsageHistory";
import type { VM } from "../../../interfaces";
import {
  statusStyles,
  CPU_COLOR,
  MEMORY_COLOR,
  formatDuration,
  formatTimestamp,
} from "./format";
import MetaField from "./MetaField";
import SpecChip from "./SpecChip";
import VmUsageChart from "./VmUsageChart";

interface Props {
  vm: VM;
  onClose: () => void;
}

const VmDetailsBody = ({ vm, onClose }: Props) => {
  const { data: templates = [] } = useAllVMTemplates();
  const {
    data: usageHistory = [],
    isLoading: usageLoading,
    isError: usageError,
  } = useVmUsageHistory(vm.id);
  // Snapshot "now" once at mount (the modal remounts fresh each time it opens)
  // rather than calling Date.now() directly during render.
  const [now] = useState(() => Date.now());

  const template = templates.find((candidate) => candidate.id === vm.templateId);
  const status = statusStyles[vm.status];
  const uptime =
    vm.status === "running" && vm.startedAt
      ? formatDuration(now - new Date(vm.startedAt).getTime())
      : "—";

  return (
    <>
      <Box sx={{ px: 3, pt: 3, pb: 2 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
          <Stack spacing={0.5}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: status.color,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {vm.name}
              </Typography>
            </Stack>
            <Typography variant="caption" sx={{ fontFamily: mono, color: "text.secondary" }}>
              {vm.id} · {status.label}
            </Typography>
          </Stack>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{
              color: "text.secondary",
              mt: -0.5,
              mr: -0.5,
              "&:hover": { color: "primary.main" },
            }}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>

      <DialogContent sx={{ px: 3, pb: 3 }}>
        <Stack spacing={3}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 2,
            }}
          >
            <MetaField label="Region" value={vm.region} />
            <MetaField label="Uptime" value={uptime} />
            <MetaField label="Cost / hr" value={`$${vm.hourlyCost.toFixed(2)}`} />
            <MetaField label="Created" value={formatTimestamp(vm.createdAt)} />
            <MetaField label="Last active" value={formatTimestamp(vm.lastActiveAt)} />
            <MetaField label="Template" value={template?.name ?? vm.templateId} />
          </Box>

          {template && (
            <Stack spacing={1}>
              <Typography variant="monoLabel">Specs</Typography>
              <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
                <SpecChip label={template.baseImage} />
                <SpecChip label={`${template.vCpu} vCPU`} />
                <SpecChip label={`${template.memoryGb} GB RAM`} />
                <SpecChip label={`${template.diskSizeGb} GB disk`} />
              </Stack>
            </Stack>
          )}

          <Stack spacing={1}>
            <Typography variant="monoLabel">Current load</Typography>
            <Stack spacing={1}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <Typography variant="caption" sx={{ width: 56, color: "text.secondary" }}>
                  CPU
                </Typography>
                <UtilizationBar value={vm.cpuUsagePercent} />
              </Stack>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <Typography variant="caption" sx={{ width: 56, color: "text.secondary" }}>
                  Memory
                </Typography>
                <UtilizationBar value={vm.memoryUsagePercent} />
              </Stack>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <Typography variant="caption" sx={{ width: 56, color: "text.secondary" }}>
                  Disk
                </Typography>
                <UtilizationBar value={vm.diskUsagePercent} />
              </Stack>
            </Stack>
          </Stack>

          <Stack spacing={1}>
            <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant="monoLabel">Usage over time</Typography>
              <Stack direction="row" spacing={2}>
                <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: CPU_COLOR }} />
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    CPU
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: MEMORY_COLOR }} />
                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    Memory
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <VmUsageChart data={usageHistory} isLoading={usageLoading} isError={usageError} />
          </Stack>
        </Stack>
      </DialogContent>
    </>
  );
};

export default VmDetailsBody;
