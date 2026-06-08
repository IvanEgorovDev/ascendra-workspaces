export type VMStatus = "running" | "stopped" | "starting" | "stopping" | "error";

export interface UtilizationTrendPoint {
  timestamp: string; // ISO timestamp, one entry per interval
  cpuPercent: number;
  memoryPercent: number;
  runningVms: number;
}

export interface VmLoadSummary {
  vmId: string;
  vmName: string;
  avgCpuPercent: number; // average load over the requested span
  avgMemoryPercent: number;
}

export interface VM {
  id: string;
  name: string;
  ownerId: string;
  templateId: string;
  status: VMStatus;
  region: string;

  // Timestamps
  createdAt: string; // ISO timestamp
  startedAt: string | null;
  lastActiveAt: string; // for idle detection

  // Current resource usage
  cpuUsagePercent: number;
  memoryUsagePercent: number;
  diskUsagePercent: number;

  // Cost
  hourlyCost: number; // USD
}

export interface VmConnectionSession {
  url: string;
}

export interface VmUsagePoint {
  timestamp: string; // ISO timestamp
  cpuPercent: number;
  memoryPercent: number;
}

export interface VMTemplate {
  id: string;
  name: string;
  description: string;
  baseImage: string; // e.g. "ubuntu-22.04"
  vCpu: number; // number of vCPU cores, e.g. 4, 8, 16
  memoryGb: number; // RAM in GB, e.g. 8, 16, 32
  diskSizeGb: number; // disk in GB, e.g. 50, 100, 200
  preinstalledTools: string[]; // e.g. ["vscode-server", "docker", "node"]
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "engineer" | "admin";
  vmCount: number;
}

export interface Policy {
  id: string;
  name: string;
  maxVmsPerUser: number;
  idleTimeoutMinutes: number; // auto-stop after this much idle time
  allowedTemplateIds: string[];
  appliesToTeam?: string;
  createdAt: string;
}

// Powers the admin "Fleet utilization" view
export interface FleetUtilization {
  period: string; // "real-time" | "last-24-hours" | "last-30-days"

  // Counts
  totalVms: number;
  runningVms: number;
  stoppedVms: number;
  totalUsers: number;

  // Aggregate utilization (right now)
  avgCpuUtilizationPercent: number;
  peakCpuUtilizationPercent: number;
  avgMemoryUtilizationPercent: number;
  peakMemoryUtilizationPercent: number;

  // Cost
  totalHourlyCost: number; // USD/hour
  monthToDateCost: number; // USD
  projectedMonthlyCost: number; // USD

  // Trend for charting
  utilizationTrend: UtilizationTrendPoint[];

  // Per-VM snapshot for the inventory view
  vmMetrics: {
    vmId: string;
    cpuPercent: number;
    memoryPercent: number;
    diskPercent: number;
    status: VMStatus;
  }[];
}
