import { Switch, Tooltip, styled } from "@mui/material";
import useColorMode from "../../hooks/useColorMode";

const moonPath =
  "M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-5.4-5.4c0-1.81.92-3.4 2.26-4.4-.44-.06-.9-.1-1.36-.1z";
const sunPath =
  "M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5a6 6 0 100 12 6 6 0 000-12zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z";

const svgIcon = (path: string, fill: string) =>
  `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
    fill,
  )}" d="${path}"/></svg>')`;

const ModeSwitch = styled(Switch)(({ theme }) => ({
  width: 58,
  height: 34,
  padding: 8,
  "& .MuiSwitch-switchBase": {
    margin: 5,
    padding: 0,
    transform: "translateX(4px)",
    "&.Mui-checked": {
      transform: "translateX(24px)",
      color: theme.palette.primary.contrastText,
      "& .MuiSwitch-thumb::before": {
        backgroundImage: svgIcon(sunPath, theme.palette.primary.contrastText),
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 24,
    height: 24,
    backgroundColor: theme.palette.primary.main,
    "&::before": {
      content: "''",
      position: "absolute",
      inset: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: svgIcon(moonPath, theme.palette.primary.contrastText),
    },
  },
  "& .MuiSwitch-track": {
    borderRadius: 20,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(230,233,237,0.16)"
        : "rgba(29,32,39,0.16)",
  },
}));

const ColorModeToggle = () => {
  const { mode, toggleMode } = useColorMode();
  const isDark = mode === "dark";

  return (
    <Tooltip title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
      <ModeSwitch
        checked={!isDark}
        onChange={toggleMode}
        slotProps={{ input: { "aria-label": "Toggle color mode" } }}
      />
    </Tooltip>
  );
};

export default ColorModeToggle;
