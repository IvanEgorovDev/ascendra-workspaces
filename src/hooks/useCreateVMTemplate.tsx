import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVMTemplate } from "../api/mock/vm";
import APIClient from "../services/api-client";
import type { VMTemplate } from "../interfaces";

const createTemplateClient = new APIClient<VMTemplate, [input: Omit<VMTemplate, "id">]>(
  createVMTemplate,
);

const useCreateVMTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: Omit<VMTemplate, "id">) => createTemplateClient.request(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
    },
  });
};

export default useCreateVMTemplate;
