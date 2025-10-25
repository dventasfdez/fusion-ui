import type { Meta, StoryObj } from "@storybook/react";
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

export const Primary: Story = {
  args: { className: "fusion-ui" },
};

export const Secondary: Story = {
  args: { className: "fusion-ui", color: "secondary" },
};

export const Success: Story = {
  args: { className: "fusion-ui", color: "success" },
};

export const Error: Story = {
  args: { className: "fusion-ui", color: "error" },
};

export const Warning: Story = {
  args: { className: "fusion-ui", color: "warning" },
};

export const Text: Story = {
  args: { className: "fusion-ui", appearance: "text" },
};

export const Outlined: Story = {
  args: { className: "fusion-ui", appearance: "outlined" },
};
