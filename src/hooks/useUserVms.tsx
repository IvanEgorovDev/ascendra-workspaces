import { useQuery } from "@tanstack/react-query";
import { getUserVms } from "../api/mock/vm";
import APIClient from "../services/api-client";
import type { VM } from "../interfaces";

const userVmsClient = new APIClient<VM[], [userId: string]>(getUserVms);

const useUserVms = (userId: string) => {
  return useQuery({
    queryKey: ["user-vms", userId],
    queryFn: () => userVmsClient.request(userId),
    refetchInterval: 5000, // for demo purposes, might have been a websocket in a real app
  });
};

export default useUserVms;
