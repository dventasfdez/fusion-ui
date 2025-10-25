import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "1",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Base: Story = {
  args: { className: "fusion-ui" },
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
