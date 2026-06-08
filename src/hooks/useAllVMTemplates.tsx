import { useQuery } from "@tanstack/react-query";
import { getVMTemplates } from "../api/mock/vm";
import APIClient from "../services/api-client";
import type { VMTemplate } from "../interfaces";

const templateClient = new APIClient<VMTemplate[]>(getVMTemplates);

const useAllVMTemplates = () => {
  return useQuery({
    queryKey: ["templates"],
    queryFn: () => templateClient.request(),
  });
};

export default useAllVMTemplates;
