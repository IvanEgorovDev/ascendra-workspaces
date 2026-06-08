import { useQuery } from "@tanstack/react-query";
import { getVMs } from "../api/mock/vm";
import APIClient from "../services/api-client";
import type { VM } from "../interfaces";

const vmClient = new APIClient<VM[]>(getVMs);

const useAllVMs = () => {
  return useQuery({
    queryKey: ["vms"],
    queryFn: () => vmClient.request(),
  });
};

export default useAllVMs;
