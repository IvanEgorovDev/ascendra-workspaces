import { useMutation } from "@tanstack/react-query";
import { login } from "../api/mock/user";
import APIClient from "../services/api-client";
import type { User } from "../interfaces";

const userClient = new APIClient<User, [email: string]>(login);

const useLogin = () => {
  return useMutation({
    mutationFn: (email: string) => userClient.request(email),
  });
};

export default useLogin;
