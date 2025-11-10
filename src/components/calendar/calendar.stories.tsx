import type { Meta, StoryObj } from "@storybook/react-vite";
import Calendar from "./calendar";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,

  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Base: Story = {};

export const Locale: Story = {
  args: {
    locale: "en-US",
  },
};
