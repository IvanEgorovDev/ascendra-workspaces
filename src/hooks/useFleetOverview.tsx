import useAllVMs from "./useAllVMs";
import useAllUsers from "./useAllUsers";
import type { VMStatus } from "../interfaces";

export const statusMeta: Record<VMStatus, { label: string; color: string }> = {
  running: { label: "Running", color: "#ffb454" },
  starting: { label: "Starting", color: "#7dd3fc" },
  stopping: { label: "Stopping", color: "#5b8cad" },
  stopped: { label: "Stopped", color: "#4a5160" },
  error: { label: "Error", color: "#ff6b6b" },
};

const statusOrder: VMStatus[] = [
  "running",
  "starting",
  "stopping",
  "stopped",
  "error",
];

export type StatSource = "vms" | "users";

export interface StatTile {
  label: string;
  source: StatSource;
  value: string;
  meta: string;
}

export interface StatusSegment {
  status: VMStatus;
  count: number;
  color: string;
}

const average = (values: number[]) =>
  values.length === 0
    ? 0
    : Math.round(values.reduce((sum, v) => sum + v, 0) / values.length);

const useFleetOverview = () => {
  const {
    data: vmData = [],
    isLoading: vmsLoading,
    error: vmsError,
  } = useAllVMs();
  const {
    data: userData = [],
    isLoading: usersLoading,
    error: usersError,
  } = useAllUsers();

  const runningVms = vmData.filter((vm) => vm.status === "running");
  const stoppedVms = vmData.filter((vm) => vm.status === "stopped");
  const engineers = userData.filter((user) => user.role === "engineer");
  const admins = userData.filter((user) => user.role === "admin");

  const avgCpu = average(vmData.map((vm) => vm.cpuUsagePercent));
  const peakCpu = vmData.length
    ? Math.max(...vmData.map((vm) => vm.cpuUsagePercent))
    : 0;
  const avgMemory = average(vmData.map((vm) => vm.memoryUsagePercent));
  const peakMemory = vmData.length
    ? Math.max(...vmData.map((vm) => vm.memoryUsagePercent))
    : 0;

  const hourlyCost = runningVms.reduce((sum, vm) => sum + vm.hourlyCost, 0);
  const projectedMonthly = hourlyCost * 24 * 30;

  const stats: StatTile[] = [
    {
      label: "Total VMs",
      source: "vms",
      value: `${vmData.length}`,
      meta: `${runningVms.length} running · ${stoppedVms.length} stopped`,
    },
    {
      label: "Active users",
      source: "users",
      value: `${userData.length}`,
      meta: `${engineers.length} engineers · ${admins.length} admins`,
    },
    {
      label: "Avg CPU utilization",
      source: "vms",
      value: `${avgCpu}%`,
      meta: `fleet-wide, peak ${peakCpu}%`,
    },
    {
      label: "Avg memory utilization",
      source: "vms",
      value: `${avgMemory}%`,
      meta: `fleet-wide, peak ${peakMemory}%`,
    },
    {
      label: "Hourly cost",
      source: "vms",
      value: `$${hourlyCost.toFixed(2)}`,
      meta: "running VMs only",
    },
    {
      label: "Projected monthly",
      source: "vms",
      value: `$${projectedMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      meta: "at current usage",
    },
  ];

  const statusBreakdown: StatusSegment[] = statusOrder
    .map((status) => ({
      status,
      count: vmData.filter((vm) => vm.status === status).length,
      color: statusMeta[status].color,
    }))
    .filter((segment) => segment.count > 0);

  return {
    vmsLoading,
    vmsError,
    usersLoading,
    usersError,
    totalVms: vmData.length,
    stats,
    statusBreakdown,
  };
};

export default useFleetOverview;
