import type {
  UtilizationTrendPoint,
  VM,
  VMTemplate,
  VmLoadSummary,
  VmUsagePoint,
} from "../../interfaces";

const vms: VM[] = [
  {
    id: "vm-001",
    name: "Dev VM 1",
    ownerId: "user-001",
    templateId: "template-ubuntu-22.04",
    status: "running",
    region: "us-east-1",
    createdAt: new Date(Date.now() - 3600 * 1000).toISOString(), // 1 hour ago
    startedAt: new Date(Date.now() - 3500 * 1000).toISOString(), // 58 minutes ago
    lastActiveAt: new Date(Date.now() - 300 * 1000).toISOString(), // 5 minutes ago
    cpuUsagePercent: 25,
    memoryUsagePercent: 40,
    diskUsagePercent: 10,
    hourlyCost: 5,
  },
  {
    id: "vm-002",
    name: "Test VM 2",
    ownerId: "user-001",
    templateId: "template-centos-8",
    status: "stopped",
    region: "eu-west-1",
    createdAt: new Date(Date.now() - 7200 * 1000).toISOString(), // 2 hours ago
    startedAt: null,
    lastActiveAt: new Date(Date.now() - 7200 * 1000).toISOString(), // 2 hours ago
    cpuUsagePercent: 0,
    memoryUsagePercent: 0,
    diskUsagePercent: 5,
    hourlyCost: 7,
  },
  {
    id: "vm-003",
    name: "Prod VM 3",
    ownerId: "user-001",
    templateId: "template-debian-11",
    status: "running",
    region: "ap-southeast-1",
    createdAt: new Date(Date.now() - 10800 * 1000).toISOString(), // 3 hours ago
    startedAt: new Date(Date.now() - 10800 * 1000).toISOString(), // 3 hours ago
    lastActiveAt: new Date(Date.now() - 10800 * 1000).toISOString(), // 3 hours ago
    cpuUsagePercent: 80,
    memoryUsagePercent: 60,
    diskUsagePercent: 40,
    hourlyCost: 10,
  },
  {
    id: "vm-004",
    name: "Dev VM 4",
    ownerId: "user-001",
    templateId: "template-ubuntu-22.04",
    status: "running",
    region: "us-east-1",
    createdAt: new Date(Date.now() - 1800 * 1000).toISOString(), // 30 minutes ago
    startedAt: new Date(Date.now() - 1700 * 1000).toISOString(), // 28 minutes ago
    lastActiveAt: new Date(Date.now() - 300 * 1000).toISOString(), // 5 minutes ago
    cpuUsagePercent: 15,
    memoryUsagePercent: 30,
    diskUsagePercent: 20,
    hourlyCost: 5,
  },
  {
    id: "vm-005",
    name: "Test VM 5",
    ownerId: "user-001",
    templateId: "template-centos-8",
    status: "stopped",
    region: "eu-west-1",
    createdAt: new Date(Date.now() - 5400 * 1000).toISOString(), // 1.5 hours ago
    startedAt: null,
    lastActiveAt: new Date(Date.now() - 5400 * 1000).toISOString(), // 1.5 hours ago
    cpuUsagePercent: 0,
    memoryUsagePercent: 0,
    diskUsagePercent: 10,
    hourlyCost: 7,
  },
  {
    id: "vm-006",
    name: "Prod VM 6",
    ownerId: "user-003",
    templateId: "template-debian-11",
    status: "running",
    region: "ap-southeast-1",
    createdAt: new Date(Date.now() - 21600 * 1000).toISOString(), // 6 hours ago
    startedAt: new Date(Date.now() - 21600 * 1000).toISOString(), // 6 hours ago
    lastActiveAt: new Date(Date.now() - 21600 * 1000).toISOString(), // 6 hours ago
    cpuUsagePercent: 50,
    memoryUsagePercent: 45,
    diskUsagePercent: 30,
    hourlyCost: 10,
  },
  {
    id: "vm-007",
    name: "Dev VM 7",
    ownerId: "user-003",
    templateId: "template-ubuntu-22.04",
    status: "running",
    region: "us-east-1",
    createdAt: new Date(Date.now() - 3600 * 1000).toISOString(), // 1 hour ago
    startedAt: new Date(Date.now() - 3500 * 1000).toISOString(), // 58 minutes ago
    lastActiveAt: new Date(Date.now() - 300 * 1000).toISOString(), // 5 minutes ago
    cpuUsagePercent: 25,
    memoryUsagePercent: 40,
    diskUsagePercent: 10,
    hourlyCost: 5,
  },
];

const templates: VMTemplate[] = [
  {
    id: "template-ubuntu-22.04",
    name: "Lightweight",
    description: "Quick sandboxes, docs, and one-off scripts.",
    baseImage: "ubuntu-22.04",
    vCpu: 4,
    memoryGb: 8,
    diskSizeGb: 50,
    preinstalledTools: ["vscode-server", "git", "node"],
  },
  {
    id: "template-centos-8",
    name: "Standard",
    description: "Default profile for day-to-day engineering work.",
    baseImage: "centos-8",
    vCpu: 8,
    memoryGb: 16,
    diskSizeGb: 100,
    preinstalledTools: ["vscode-server", "docker", "node", "go"],
  },
  {
    id: "template-debian-11",
    name: "Compute",
    description: "Heavier builds, ML experiments, and data pipelines.",
    baseImage: "debian-11",
    vCpu: 16,
    memoryGb: 32,
    diskSizeGb: 200,
    preinstalledTools: ["vscode-server", "docker", "cuda", "python"],
  },
];

const promiseTemplate = (failureChance: number = 0.1) =>
  new Promise((resolve, reject) =>
    setTimeout(
      () => {
        if (Math.random() < failureChance) {
          reject(new Error("Failed to fetch VMs"));
        } else {
          resolve(null);
        }
      },
      // random delay 0.5-3s
      500 + Math.random() * 2500,
    ),
  );

export async function getVMs() {
  await promiseTemplate(0.1); // 10% chance of failure

  return new Response(JSON.stringify(vms), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function getUserVms(userId: string) {
  await promiseTemplate(0.1); // 10% chance of failure

  const userVms = vms.filter((vm) => vm.ownerId === userId);

  return new Response(JSON.stringify(userVms), {
    headers: { "Content-Type": "application/json" },
  });
}

const findVM = (id: string) => vms.find((candidate) => candidate.id === id);

const vmNotFoundResponse = () =>
  new Response(JSON.stringify({ message: "No VM found for that id" }), {
    status: 404,
    headers: { "Content-Type": "application/json" },
  });

export async function startVM(id: string) {
  await promiseTemplate(0.1); // 10% chance of failure

  const vm = findVM(id);
  if (!vm) return vmNotFoundResponse();

  const now = new Date().toISOString();
  vm.status = "running";
  vm.startedAt = now;
  vm.lastActiveAt = now;

  return new Response(JSON.stringify(vm), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function stopVM(id: string) {
  await promiseTemplate(0.1); // 10% chance of failure

  const vm = findVM(id);
  if (!vm) return vmNotFoundResponse();

  vm.status = "stopped";
  vm.startedAt = null;
  vm.lastActiveAt = new Date().toISOString();

  return new Response(JSON.stringify(vm), {
    headers: { "Content-Type": "application/json" },
  });
}

// Each transitional phase lasts longer than the dashboard's 5s refetch
// interval, so "stopping"/"starting" are reliably visible in the table
// before the VM settles into "running".
const RESTART_PHASE_MS = 6000;

export async function restartVM(id: string) {
  await promiseTemplate(0.1); // 10% chance of failure

  const vm = findVM(id);
  if (!vm) return vmNotFoundResponse();

  vm.status = "stopping";
  vm.lastActiveAt = new Date().toISOString();

  setTimeout(() => {
    vm.status = "starting";
    vm.lastActiveAt = new Date().toISOString();

    setTimeout(() => {
      const finishedAt = new Date().toISOString();
      vm.status = "running";
      vm.startedAt = finishedAt;
      vm.lastActiveAt = finishedAt;
    }, RESTART_PHASE_MS);
  }, RESTART_PHASE_MS);

  return new Response(JSON.stringify(vm), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function connectToVM(id: string) {
  await promiseTemplate(0.1); // 10% chance of failure

  const vm = findVM(id);
  if (!vm) return vmNotFoundResponse();

  vm.lastActiveAt = new Date().toISOString();

  const session = {
    url: `https://connect.ascendra.dev/${vm.id}?session=${Math.random().toString(36).slice(2, 10)}`,
  };

  return new Response(JSON.stringify(session), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function getVMTemplates() {
  await promiseTemplate(0.1); // 10% chance of failure

  return new Response(JSON.stringify(templates), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function createVMTemplate(input: Omit<VMTemplate, "id">) {
  await promiseTemplate(0.1); // 10% chance of failure

  const template: VMTemplate = {
    id: `template-${input.baseImage}-${Date.now()}`,
    ...input,
  };

  templates.push(template);

  return new Response(JSON.stringify(template), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}

export async function updateVMTemplate(
  id: string,
  updates: Partial<Omit<VMTemplate, "id">>,
) {
  await promiseTemplate(0.1); // 10% chance of failure

  const index = templates.findIndex((candidate) => candidate.id === id);

  if (index === -1) {
    return new Response(
      JSON.stringify({ message: "No template found for that id" }),
      { status: 404, headers: { "Content-Type": "application/json" } },
    );
  }

  templates[index] = { ...templates[index], ...updates };

  return new Response(JSON.stringify(templates[index]), {
    headers: { "Content-Type": "application/json" },
  });
}

const randomValues = (steps: number, start: number) => {
  const values: number[] = [];
  let current = start;

  for (let i = 0; i < steps; i++) {
    current = Math.min(100, Math.max(0, current + (Math.random() - 0.5) * 10));
    values.push(Math.round(current));
  }

  return values;
};

export async function getUtilizationHistory(days: number) {
  await promiseTemplate(0.1); // 10% chance of failure

  const cpuTrend = randomValues(days, 40 + Math.random() * 25);
  const memoryTrend = randomValues(days, 45 + Math.random() * 25);

  const history: UtilizationTrendPoint[] = cpuTrend.map((cpuPercent, i) => {
    const timestamp = new Date();
    timestamp.setDate(timestamp.getDate() - (days - 1 - i));

    return {
      timestamp: timestamp.toISOString(),
      cpuPercent,
      memoryPercent: memoryTrend[i],
      runningVms: vms.filter((vm) => vm.status === "running").length,
    };
  });

  return new Response(JSON.stringify(history), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function getVmUsageHistory(vmId: string, points: number = 12) {
  await promiseTemplate(0.1); // 10% chance of failure

  const vm = findVM(vmId);
  if (!vm) return vmNotFoundResponse();

  const cpuTrend = randomValues(points, vm.cpuUsagePercent);
  const memoryTrend = randomValues(points, vm.memoryUsagePercent);

  const history: VmUsagePoint[] = cpuTrend.map((cpuPercent, i) => {
    const timestamp = new Date();
    timestamp.setMinutes(timestamp.getMinutes() - (points - 1 - i) * 10);

    return {
      timestamp: timestamp.toISOString(),
      cpuPercent,
      memoryPercent: memoryTrend[i],
    };
  });

  return new Response(JSON.stringify(history), {
    headers: { "Content-Type": "application/json" },
  });
}

const clampPercent = (value: number) =>
  Math.min(100, Math.max(0, Math.round(value)));

export async function getVmLoadDistribution(days: number) {
  await promiseTemplate(0.1); // 10% chance of failure

  // Averages over a short span swing further from the baseline (fewer
  // samples to smooth out); longer spans converge toward it.
  const spread = Math.max(15, 50 - days);

  const distribution: VmLoadSummary[] = vms.map((vm) => {
    const baseline = vm.status === "running" ? 50 : 12;

    return {
      vmId: vm.id,
      vmName: vm.name,
      avgCpuPercent: clampPercent(
        baseline + (Math.random() - 0.5) * spread * 2,
      ),
      avgMemoryPercent: clampPercent(
        baseline + (Math.random() - 0.5) * spread * 2,
      ),
    };
  });

  return new Response(JSON.stringify(distribution), {
    headers: { "Content-Type": "application/json" },
  });
}
