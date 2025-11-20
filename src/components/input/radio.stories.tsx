import type { Meta, StoryObj } from "@storybook/react-vite";
import Input from "./input";
const meta: Meta<typeof Input> = {
  title: "Inputs/Radio",
  component: Input,
  args: {
    type: "radio",
  },
  argTypes: {
    checked: { control: "boolean" },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Base: Story = {};

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
