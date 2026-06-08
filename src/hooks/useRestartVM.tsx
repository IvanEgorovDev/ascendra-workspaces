import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restartVM } from "../api/mock/vm";
import APIClient from "../services/api-client";
import type { VM } from "../interfaces";

const restartVmClient = new APIClient<VM, [id: string]>(restartVM);

const useRestartVM = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => restartVmClient.request(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-vms"] });
      queryClient.invalidateQueries({ queryKey: ["vms"] });
    },
  });
};

export default useRestartVM;
