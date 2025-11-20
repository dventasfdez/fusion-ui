import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./input";
import Icon from "../icon/icon";
import IconButton from "../button/icon";

const meta: Meta<typeof Input> = {
  title: "Inputs/Text",
  component: Input,
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
export const WithIcon: Story = {
  args: {
    icon: <Icon name="search" />,
  },
};

export const WithIconButton: Story = {
  args: {
    icon: <IconButton name="search" appearance="text" color="neutral" />,
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
