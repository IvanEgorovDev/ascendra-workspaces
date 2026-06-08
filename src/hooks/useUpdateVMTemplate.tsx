import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVMTemplate } from "../api/mock/vm";
import APIClient from "../services/api-client";
import type { VMTemplate } from "../interfaces";

const updateTemplateClient = new APIClient<
  VMTemplate,
  [id: string, updates: Partial<Omit<VMTemplate, "id">>]
>(updateVMTemplate);

const useUpdateVMTemplate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Omit<VMTemplate, "id">>;
    }) => updateTemplateClient.request(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
    },
  });
};

export default useUpdateVMTemplate;
