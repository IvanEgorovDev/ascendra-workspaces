import { useMutation, useQueryClient } from "@tanstack/react-query";
import { stopVM } from "../api/mock/vm";
import APIClient from "../services/api-client";
import type { VM } from "../interfaces";

const stopVmClient = new APIClient<VM, [id: string]>(stopVM);

const useStopVM = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => stopVmClient.request(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-vms"] });
      queryClient.invalidateQueries({ queryKey: ["vms"] });
    },
  });
};

export default useStopVM;
