import { create } from "storybook/theming/create";

export const themeLight = create({
  base: "light",
  colorPrimary: "#8b5cf6",
  colorSecondary: "#6366f1",

  appBg: "#ffffff",
  appContentBg: "#ffffff",
  appBorderColor: "#e2e8f0",
  appBorderRadius: 4,

  textColor: "#1e293b",
  textInverseColor: "#ffffff",

  barBg: "#f1f5f9",
  barTextColor: "#1e293b",
  barSelectedColor: "#8b5cf6",

  inputBg: "#ffffff",
  inputBorder: "#e2e8f0",
  inputTextColor: "#1e293b",

  brandTitle: "Fusion UI",
  brandImage: "/fusion-ui-lockup.png",
  brandTarget: "_self",

  fontBase:
    "Roboto, system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif",
});

export const themeDark = create({
  base: "dark",
  colorPrimary: "#8b5cf6",
  colorSecondary: "#6366f1",

  appBg: "#1e293b",
  appContentBg: "#334155",
  appBorderColor: "#475569",
  appBorderRadius: 4,

  textColor: "#ffffff",
  textInverseColor: "#1e293b",

  barBg: "#334155",
  barTextColor: "#e2e8f0",
  barSelectedColor: "#8b5cf6",

  inputBg: "#334155",
  inputBorder: "#475569",
  inputTextColor: "#ffffff",

  brandTitle: "Fusion UI",
  brandImage: "/fusion-ui-dark.png",
  brandTarget: "_self",

  fontBase:
    "Roboto, system-ui, -apple-system, Segoe UI, Helvetica, Arial, sans-serif",
});

export default themeLight;
