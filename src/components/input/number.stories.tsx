import type { Meta, StoryObj } from "@storybook/react-vite";
import Input from "./number";
const meta: Meta<typeof Input> = {
  title: "Inputs/Number",
  component: Input,
  args: {
    type: "number",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Base: Story = {};
export const Large: Story = {
  args: {
    size: "large",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Label",
  },
};
export const WithLabelAndRequired: Story = {
  args: {
    label: "Label",
    required: true,
  },
};
export const WithHelperText: Story = {
  args: {
    label: "Label",
    required: true,
    helper: <p>Lorem ipsum dolor sit amet.</p>,
  },
};

export const WithError: Story = {
  args: {
    label: "Label",
    required: true,
    helper: <p>Lorem ipsum dolor sit amet.</p>,
    error: true,
  },
};
