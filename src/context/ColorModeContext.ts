import { createContext } from "react";
import type { PaletteMode } from "@mui/material";

export interface ColorModeContextValue {
  mode: PaletteMode;
  toggleMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextValue | null>(null);
