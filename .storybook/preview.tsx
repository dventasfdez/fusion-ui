import type { Preview } from "@storybook/react-vite";
import {
  DocsContainer,
  DocsContainerProps,
} from "@storybook/addon-docs/blocks";
import { themeLight, themeDark } from "./theme";

import "../src/assets/styles/main.scss";
import { ThemeProvider } from "storybook/theming";
import { useGlobals } from "storybook/manager-api";

const isDarkTheme = (globals: any) => {
  return globals.theme === "Dark";
};

// Custom Docs Container that tracks the toolbar theme
const ThemedDocsContainer = ({ context, children }: DocsContainerProps) => {
  // const [{ theme: _themeGlobal }, _] = useGlobals();
  // console.log("🚀", _themeGlobal);
  const theme = isDarkTheme(
    (context.channel as any).data.globalsUpdated[0].globals
  )
    ? themeDark
    : themeLight;
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
      toc: {
        title: "Variants",
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
