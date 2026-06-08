import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startVM } from "../api/mock/vm";
import APIClient from "../services/api-client";
import type { VM } from "../interfaces";

const startVmClient = new APIClient<VM, [id: string]>(startVM);

const useStartVM = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => startVmClient.request(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-vms"] });
      queryClient.invalidateQueries({ queryKey: ["vms"] });
    },
  });
};

export default useStartVM;
