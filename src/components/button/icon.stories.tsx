import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from "./button";
import Icon from "../icon/icon";

const meta: Meta<typeof IconButton> = {
  title: "Components/Icon Button",
  component: IconButton,
  tags: ["autodocs"],
  args: {
    name: "search",
  },
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { color: "secondary" },
};

export const Accent: Story = {
  args: { color: "accent" },
};

export const Success: Story = {
  args: { color: "success" },
};

export const Error: Story = {
  args: { color: "error" },
};

export const Warning: Story = {
  args: { color: "warning" },
};

export const Neutral: Story = {
  args: { color: "neutral" },
};
