import type { Meta, StoryObj } from "@storybook/react-vite";
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
  args: {},
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
