import { useMemo, useState, type ReactNode } from "react";
import { CssBaseline, ThemeProvider, type PaletteMode } from "@mui/material";
import getTheme from "../theme";
import { ColorModeContext, type ColorModeContextValue } from "./ColorModeContext";

const STORAGE_KEY = "ascendra-color-mode";

// The console lives in the dark by default; light mode is opt-in and
// remembered across sessions via localStorage.
const readStoredMode = (): PaletteMode => {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "light" ? "light" : "dark";
};

export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PaletteMode>(readStoredMode);

  const value = useMemo<ColorModeContextValue>(
    () => ({
      mode,
      toggleMode: () =>
        setMode((current) => {
          const next: PaletteMode = current === "dark" ? "light" : "dark";
          window.localStorage.setItem(STORAGE_KEY, next);
          return next;
        }),
    }),
    [mode],
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext>
  );
};
