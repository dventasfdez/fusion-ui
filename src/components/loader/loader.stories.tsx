import type { Meta, StoryObj } from "@storybook/react-vite";
import Loader from "./loader";

const meta: Meta<typeof Loader> = {
  title: "Components/Loader",
  component: Loader,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Base: Story = {};
export const TitleAndSubtitle: Story = {
  args: {
    title: "Loading Data",
    subtitle: "Please wait while we fetch the information.",
  },
};

export const Circular: Story = {
  args: {
    ...TitleAndSubtitle.args,
    percentage: { show: false, value: 70 },
  },
};

export const CircularError: Story = {
  args: {
    ...TitleAndSubtitle.args,
    error: true,
    automatic: true,
  },
};
export const CircularSuccess: Story = {
  args: {
    ...TitleAndSubtitle.args,
    success: true,
    automatic: true,
  },
};

export const Oval: Story = {
  args: {
    ...TitleAndSubtitle.args,
    percentage: { show: true, value: 40 },
  },
};
export const OvalError: Story = {
  args: {
    ...TitleAndSubtitle.args,
    error: true,
    automatic: true,
    percentage: { show: true, value: 40 },
  },
};
export const OvalSuccess: Story = {
  args: {
    ...TitleAndSubtitle.args,
    success: true,
    automatic: true,
    percentage: { show: true, value: 40 },
  },
};
