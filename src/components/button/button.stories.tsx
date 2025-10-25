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
  args: { primary: true, className: "fusion-ui" },
};

export const Secondary: Story = {
  args: { secondary: true },
};

export const CTA: Story = {
  args: { cta: true },
};

export const WithIconLeft: Story = {
  args: { icon: { value: "check", position: "left" } },
};

export const WithIconRight: Story = {
  args: { icon: { value: "check", position: "right" } },
};
