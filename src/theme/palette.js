import { alpha } from "@mui/material/styles";

const PRIMARY = {
  main: "#4C1A88",
  medium: "#4D44B5",
  lighter: "#8090e4",
  action: "#EDECF8",
  light: "#f3f4ff",
};

const SECONDARY = {
  main: "#D0D5DD",
  light: "#FFBFA0",
};

const INFO = {
  main: "#4c1b88", // "#878787",
};

const SUCCESS = {
  main: "#027A48",
  light: "#ECFDF3",
};

const WARNING = {
  main: "#DC6803",
};

const ERROR = {
  main: "#D92D20",
};
const BACKGROUND = {
  // default: '#f3f4ff',
  // default: "#f5f5f5",
  light: "#ffffff",
};

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#EAECF0",
  300: "#D0D5DD",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#667085",
  700: "#454F5B",
  800: "#344054",
  900: "#101828",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
};

const CHART_COLORS = {
  orange: ["#FB7D5B", "#FF8F6D", "#FFBD98", "#FFF2D4"],
  violet: ["#826AF9", "#9E86FF", "#D0AEFF", "#F7D2FF"],
  blue: ["#2D99FF", "#83CFFF", "#A5F3FF", "#CCFAFF"],
  green: ["#2CD9C5", "#60F1C8", "#A4F7CC", "#C0F2DC"],
  yellow: ["#FCC43E", "#FFEF5A", "#FFF7AE", "#FFF3D6"],
  red: ["#FF6C40", "#FF8F6D", "#FFBD98", "#FFF2D4"],
};

const palette = {
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  text: { primary: GREY[900], secondary: GREY[700], disabled: GREY[500] },
  chart: CHART_COLORS,
  background: {
    ...BACKGROUND,
  },
};

export default palette;
