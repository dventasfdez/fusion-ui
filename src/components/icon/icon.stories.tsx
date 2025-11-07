import type { Meta, StoryObj } from "@storybook/react-vite";
import Icon from "./icon";
import "../../assets/styles/main.scss";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  args: {
    name: "search",
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Base: Story = {};
