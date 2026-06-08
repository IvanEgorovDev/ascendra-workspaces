import { useMemo, useState, type ReactNode } from "react";
import type { User } from "../interfaces";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <AuthContext value={value}>{children}</AuthContext>;
};
