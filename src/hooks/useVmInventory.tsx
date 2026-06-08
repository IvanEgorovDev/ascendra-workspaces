import { useMemo, useState } from "react";
import useAllVMs from "./useAllVMs";
import useAllUsers from "./useAllUsers";

export type VmFilterCategory = "name" | "owner" | "region";

export type VmFilters = Record<VmFilterCategory, Set<string>>;

const emptyFilters = (): VmFilters => ({
  name: new Set(),
  owner: new Set(),
  region: new Set(),
});

const sortedUnique = (values: string[]) =>
  Array.from(new Set(values.filter(Boolean))).sort((a, b) =>
    a.localeCompare(b),
  );

const useVmInventory = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<VmFilters>(emptyFilters);

  const {
    data: vms = [],
    isLoading: vmsLoading,
    error: vmsError,
  } = useAllVMs();

  const { data: users = [] } = useAllUsers();

  const getUserNameById = (id: string) => {
    const user = users.find((user) => user.id === id);
    return user ? user.name : "";
  };

  const filterOptions = useMemo<Record<VmFilterCategory, string[]>>(
    () => ({
      name: sortedUnique(vms.map((vm) => vm.name)),
      owner: sortedUnique(vms.map((vm) => getUserNameById(vm.ownerId))),
      region: sortedUnique(vms.map((vm) => vm.region)),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [vms, users],
  );

  const toggleFilter = (category: VmFilterCategory, value: string) => {
    setFilters((prev) => {
      const next = new Set(prev[category]);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return { ...prev, [category]: next };
    });
  };

  const clearFilters = () => setFilters(emptyFilters());

  const activeFilterCount =
    filters.name.size + filters.owner.size + filters.region.size;

  const filteredVms = vms.filter((vm) => {
    const ownerName = getUserNameById(vm.ownerId);

    if (filters.name.size && !filters.name.has(vm.name)) return false;
    if (filters.owner.size && !filters.owner.has(ownerName)) return false;
    if (filters.region.size && !filters.region.has(vm.region)) return false;

    if (search) {
      const searchLower = search.toLowerCase();
      return (
        vm.name.toLowerCase().includes(searchLower) ||
        vm.region.toLowerCase().includes(searchLower) ||
        ownerName.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  return {
    vms: filteredVms,
    vmsLoading,
    vmsError,
    search,
    setSearch,
    filterOptions,
    filters,
    toggleFilter,
    clearFilters,
    activeFilterCount,
  };
};

export default useVmInventory;
