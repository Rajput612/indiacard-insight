// UI related constants
export const SIZES = {
  xs: "xs",
  sm: "sm",
  md: "md",
  lg: "lg",
  xl: "xl"
} as const;

export const COLORS = {
  navy: "#1A2E4C",
  gold: "#F2C94C",
  slateBlue: "#7C8DB5",
  lightBg: "#F8FAFC",
  successGreen: "#48BB78"
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536
} as const;

export const TRANSITIONS = {
  DEFAULT: "all 0.3s ease",
  FAST: "all 0.15s ease",
  SLOW: "all 0.5s ease"
} as const;

export const Z_INDEX = {
  modal: 1000,
  overlay: 900,
  drawer: 800,
  popover: 700,
  header: 600,
  dropdown: 500
} as const;