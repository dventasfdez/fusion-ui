import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
  },
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

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
