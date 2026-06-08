import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import useAuth from "./useAuth";
import type { User } from "../interfaces";

const useRequireRole = (role: User["role"]) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const isAuthorized = user?.role === role;

  useEffect(() => {
    if (!isAuthorized) {
      navigate({ to: "/" });
    }
  }, [isAuthorized, navigate]);

  return isAuthorized ? user : null;
};

export default useRequireRole;
