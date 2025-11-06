import type { Meta, StoryObj } from "@storybook/react-vite";
import Avatar from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: {
    children: <img src="/fusion-ui.png" alt="avatar" />,
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Base: Story = {
  args: {},
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Clickable: Story = {
  args: {
    onClick: () => console.log("Avatar clicked!"),
  },
};

export const ClickableDisabled: Story = {
  args: {
    onClick: () => console.log("Avatar clicked!"),
    disabled: true,
  },
};

export const WithTitle: Story = {
  args: {
    title: "Avatar Title",
  },
};
export const WithSubtitle: Story = {
  args: {
    title: "Avatar Title",
    subtitle: "Avatar role",
  },
};

export const WithBadge: Story = {
  args: {
    badge: 8,
  },
};
