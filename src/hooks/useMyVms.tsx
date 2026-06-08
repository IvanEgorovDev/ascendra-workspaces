import { useMemo, useState } from "react";
import useAuth from "./useAuth";
import useUserVms from "./useUserVms";

const useMyVms = () => {
  const { user } = useAuth();
  const {
    data: vms = [],
    isLoading: vmsLoading,
    error: vmsError,
  } = useUserVms(user?.id ?? "");
  const [search, setSearch] = useState("");

  const matchesSearch = (
    vm: { name: string; templateId: string; region: string },
    query: string,
  ) => {
    const needle = query.trim().toLowerCase();
    if (!needle) return true;

    return (
      vm.name.toLowerCase().includes(needle) ||
      vm.templateId.toLowerCase().includes(needle) ||
      vm.region.toLowerCase().includes(needle)
    );
  };

  const filteredVms = useMemo(
    () => vms.filter((vm) => matchesSearch(vm, search)),
    [vms, search],
  );

  return {
    vms: filteredVms,
    vmsLoading,
    vmsError,
    search,
    setSearch,
  };
};

export default useMyVms;
