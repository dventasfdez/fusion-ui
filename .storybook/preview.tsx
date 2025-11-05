import type { Preview } from "@storybook/react-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import {
  DocsContainer,
  DocsContainerProps,
} from "@storybook/addon-docs/blocks";
import { themeLight, themeDark } from "./theme";

import "../src/assets/styles/main.scss";
import { ThemeProvider } from "storybook/theming";

const isDarkTheme = () => {
  const params: any = {};
  const query = window.location.search;

  for (const [, key, value] of query.matchAll(/([^?&=]+)=([^&]*)/g)) {
    const splittedVal = decodeURIComponent(value).split(":");
    if (splittedVal) {
      params[splittedVal[0]] = decodeURIComponent(splittedVal[1]);
    } else params[key] = decodeURIComponent(value);
  }

  return params.theme === "Dark";
};

// Custom Docs Container that tracks the toolbar theme
const ThemedDocsContainer = ({ context, children }: DocsContainerProps) => {
  const theme = isDarkTheme() ? themeDark : themeLight;
  return (
    <DocsContainer context={context} theme={theme}>
      {children}
    </DocsContainer>
  );
};

const preview: Preview = {
  parameters: {
    // Fullscreen so our wrapper + backgrounds control the canvas
    layout: "fullscreen",
    backgrounds: {
      disable: true,
    },
    docs: {
      container: ThemedDocsContainer,
    },
  },

  decorators: [
    // Toggle CSS variables in the preview iframe
    withThemeByDataAttribute({
      themes: {
        Light: "light",
        Dark: "dark",
      },
      attributeName: "data-theme",
      defaultTheme: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "Dark"
        : "Light",
    }),

    // Sync canvas background selection with the theme toolbar
    (Story, { globals, viewMode }) => {
      const theme = globals.theme === "Dark" ? themeDark : themeLight;
      return (
        <ThemeProvider theme={theme}>
          <div
            className="fusion-ui flex align_center justify_center"
            style={{
              width: "100%",
              height: viewMode === "story" ? "100vh" : "100%",
            }}
          >
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
