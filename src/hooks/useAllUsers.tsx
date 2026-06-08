import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/mock/user";
import type { User } from "../interfaces";
import APIClient from "../services/api-client";

const userClient = new APIClient<User[]>(getAllUsers);

const useAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => userClient.request(),
  });
};

export default useAllUsers;
