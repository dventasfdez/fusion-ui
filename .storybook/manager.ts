import { addons } from "storybook/manager-api";
import {
  GLOBALS_UPDATED,
  UPDATE_GLOBALS,
  FORCE_RE_RENDER,
} from "storybook/internal/core-events";
import { themeLight, themeDark } from "./theme";

type Mode = "light" | "dark";

const applyTheme = (mode: Mode) => {
  addons.setConfig({ theme: mode === "dark" ? themeDark : themeLight });
};

// Read the current theme from the Storybook URL (globals are persisted there)
const getThemeFromUrl = (): Mode | undefined => {
  try {
    const params = new URLSearchParams(window.location.search);
    const globals = params.get("globals");
    if (!globals) return undefined;
    // format example: "theme:dark;backgrounds:!" or encoded
    const decoded = decodeURIComponent(globals);
    const entries = decoded.split(";");
    for (const entry of entries) {
      const [key, value] = entry.split(":");
      if (key === "theme" && (value === "light" || value === "dark")) {
        return value as Mode;
      }
    }
  } catch {}
  return undefined;
};

// Initialize using URL → system fallback
applyTheme(
  getThemeFromUrl() ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light")
);

// Keep in sync with: toolbar changes, story changes, URL updates, and OS scheme
const channel = addons.getChannel();

const handleGlobals = (payload: any) => {
  const g =
    payload?.globals || payload?.updatedGlobals || payload?.changes?.globals;
  const mode = g?.theme as Mode | undefined;
  if (mode === "light" || mode === "dark") applyTheme(mode);
};

channel.on(UPDATE_GLOBALS, handleGlobals);
channel.on(GLOBALS_UPDATED, handleGlobals);

window.addEventListener("popstate", () => {
  const fromUrl = getThemeFromUrl();
  if (fromUrl) applyTheme(fromUrl);
});

try {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", (e) =>
    applyTheme(e.matches ? "dark" : "light")
  );
} catch {}
