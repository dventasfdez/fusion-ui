import type { Meta, StoryObj } from "@storybook/react-vite";
import Datepicker from "./datepicker";

const meta: Meta<typeof Datepicker> = {
  title: "Components/Datepicker",
  component: Datepicker,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Datepicker>;

export const Base: Story = {};
