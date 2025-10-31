import type { Preview, ReactRenderer } from "@storybook/react-vite";
import { withThemeByDataAttribute } from "@storybook/addon-themes";

import "../src/assets/styles/main.scss";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    // Wrap stories with Fusion UI root so CSS variables apply and background can fill
    (Story) => (
      <div className="fusion-ui surface-primary">
        <Story />
      </div>
    ),
    // Toggle data-theme on that root
    withThemeByDataAttribute<ReactRenderer>({
      attributeName: "data-theme",
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
