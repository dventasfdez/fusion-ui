import type { Preview } from "@storybook/react-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";

import "../src/assets/styles/main.scss";
import { darken } from "storybook/theming";

const preview: Preview = {
  parameters: {
    // Center stories within the canvas
    layout: "centered",
    backgrounds: {
      disable: true,
    },
    // docs: {
    //   theme: themeLight,
    // },
  },

  decorators: [
    withThemeByDataAttribute({
      themes: {
        light: "",
        dark: "dark",
      },
      attributeName: "data-theme",
      defaultTheme: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    }),
  ],
};

export default preview;
