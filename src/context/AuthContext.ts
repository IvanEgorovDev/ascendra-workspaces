import { createContext } from "react";
import type { User } from "../interfaces";

export interface AuthContextValue {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
