import { addons } from "storybook/manager-api";
import { GLOBALS_UPDATED } from "storybook/internal/core-events";
import { themeLight, themeDark } from "./theme";

const applyTheme = (mode: "light" | "dark") => {
  addons.setConfig({ theme: mode === "dark" ? themeDark : themeLight });
};

// Initial theme from system preference
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(prefersDark ? "dark" : "light");

// React to global toolbar "theme" changes
const channel = addons.getChannel();
channel.on(GLOBALS_UPDATED, ({ globals }: any) => {
  const mode = globals?.theme as "light" | "dark" | undefined;
  if (mode === "light" || mode === "dark") applyTheme(mode);
});

// React to system theme changes
try {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener?.("change", (e) =>
    applyTheme(e.matches ? "dark" : "light")
  );
} catch {}
