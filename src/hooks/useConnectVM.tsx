import { useMutation, useQueryClient } from "@tanstack/react-query";
import { connectToVM } from "../api/mock/vm";
import APIClient from "../services/api-client";
import type { VmConnectionSession } from "../interfaces";

const connectVmClient = new APIClient<VmConnectionSession, [id: string]>(
  connectToVM,
);

const useConnectVM = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => connectVmClient.request(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-vms"] });
      queryClient.invalidateQueries({ queryKey: ["vms"] });
    },
  });
};

export default useConnectVM;
