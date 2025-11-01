import type { Preview } from "@storybook/react-vite";
import { themeLight } from "./theme";

import "../src/assets/styles/main.scss";

const preview: Preview = {
  parameters: {
    // Center stories within the canvas
    layout: "centered",
    backgrounds: {
      disable: true,
    },
    docs: {
      theme: themeLight,
    },
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "mirror",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },

  decorators: [
    // Wrap stories with Fusion UI root so CSS variables apply and background can fill
    (Story, { globals }) => {
      const theme = globals.theme as "light" | "dark";
      return (
        <div
          className="fusion-ui flex align_center justify_center"
          data-theme={theme}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
