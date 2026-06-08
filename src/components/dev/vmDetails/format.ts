import type { VMStatus } from "../../../interfaces";

export const statusStyles: Record<VMStatus, { color: string; label: string }> = {
  running: { color: "#ffb454", label: "Running" },
  starting: { color: "#7dd3fc", label: "Starting" },
  stopping: { color: "#5b8cad", label: "Stopping" },
  stopped: { color: "#4a5160", label: "Stopped" },
  error: { color: "#ff6b6b", label: "Error" },
};

export const CPU_COLOR = "#ffb454";
export const MEMORY_COLOR = "#7dd3fc";

export const formatDuration = (ms: number) => {
  if (ms <= 0) return "—";

  const minutes = Math.floor(ms / 60_000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  return `${minutes}m`;
};

export const formatTimestamp = (iso: string) =>
  new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

export const formatClock = (iso: string) =>
  new Date(iso).toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
