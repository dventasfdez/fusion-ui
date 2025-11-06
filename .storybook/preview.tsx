import type { Preview } from "@storybook/react-vite";
import { themeLight, themeDark } from "./theme";

import "../src/assets/styles/main.scss";
import { ThemeProvider } from "storybook/theming";

const preview: Preview = {
  parameters: {
    // Fullscreen so our wrapper + backgrounds control the canvas
    layout: "fullscreen",
    backgrounds: {
      disable: true,
    },
    docs: {
      theme:
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? themeDark
          : themeLight,
      toc: {
        title: "",
        disable: false,
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: ["Light", "Dark"],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme:
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "Dark"
        : "Light",
  },

  decorators: [
    // Sync canvas background selection with the theme toolbar
    (Story, { globals, viewMode }) => {
      const theme = globals.theme === "Dark" ? themeDark : themeLight;
      return (
        <ThemeProvider theme={theme}>
          <div
            className="fusion-ui flex align_center justify_center p-2"
            style={{
              width: "100%",
              height: viewMode === "story" ? "100vh" : "100%",
            }}
            data-theme={(globals.theme as string).toLowerCase()}
          >
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
