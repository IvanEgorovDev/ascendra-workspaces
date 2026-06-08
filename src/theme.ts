import { createTheme, type PaletteMode } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    monoLabel: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    monoLabel?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    monoLabel: true;
  }
}

export const mono = '"JetBrains Mono", "Courier New", monospace';
export const sora = '"Sora", "Segoe UI", Helvetica, Arial, sans-serif';

interface ModeTokens {
  background: { default: string; paper: string };
  text: { primary: string; secondary: string };
  divider: string;
  error: string;
  inputFill: string;
  inputBorder: string;
  inputBorderHover: string;
  accent: string;
  accentContrastText: string;
}

const modeTokens: Record<PaletteMode, ModeTokens> = {
  dark: {
    background: { default: "#0b0d11", paper: "#12151a" },
    text: { primary: "#e6e9ed", secondary: "#8a92a0" },
    divider: "rgba(230, 233, 237, 0.08)",
    error: "#ff6b6b",
    inputFill: "rgba(255,255,255,0.02)",
    inputBorder: "rgba(230,233,237,0.14)",
    inputBorderHover: "rgba(230,233,237,0.26)",
    accent: "#ffb454",
    accentContrastText: "#0b0f14",
  },
  light: {
    background: { default: "#f2efe7", paper: "#fbf9f4" },
    text: { primary: "#1d2027", secondary: "#666c76" },
    divider: "rgba(29, 32, 39, 0.12)",
    error: "#c8463d",
    inputFill: "rgba(29,32,39,0.025)",
    inputBorder: "rgba(29,32,39,0.16)",
    inputBorderHover: "rgba(29,32,39,0.28)",
    accent: "#a8590e",
    accentContrastText: "#fff8ef",
  },
};

const getTheme = (mode: PaletteMode) => {
  const tokens = modeTokens[mode];

  return createTheme({
    palette: {
      mode,
      primary: {
        main: tokens.accent,
        contrastText: tokens.accentContrastText,
      },
      background: tokens.background,
      text: tokens.text,
      error: {
        main: tokens.error,
      },
      divider: tokens.divider,
    },
    shape: {
      borderRadius: 8,
    },
    typography: (palette) => ({
      fontFamily: sora,
      h5: {
        fontWeight: 600,
      },
      body2: {
        color: palette.text.secondary,
      },
      button: {
        textTransform: "none",
        fontWeight: 600,
      },
      overline: {
        fontFamily: mono,
        fontSize: "0.8125rem",
        letterSpacing: "0.16em",
        lineHeight: 1.6,
      },
      monoLabel: {
        fontFamily: mono,
        fontSize: "0.75rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: palette.text.secondary,
      },
    }),
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: tokens.background.default,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: tokens.inputFill,
            "& fieldset": {
              borderColor: tokens.inputBorder,
              transition: "border-color 0.15s ease",
            },
            "&:hover fieldset": {
              borderColor: tokens.inputBorderHover,
            },
            "&.Mui-focused fieldset": {
              borderColor: tokens.accent,
              borderWidth: 1.5,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            paddingTop: 11,
            paddingBottom: 11,
            fontSize: "0.9375rem",
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            fontSize: "0.825rem",
            alignItems: "center",
          },
        },
      },
    },
  });
};

export default getTheme;
