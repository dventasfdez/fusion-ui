import type { Meta, StoryObj } from "@storybook/react-vite";
import Chip from "./chip";
import Icon from "../icon/icon";

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  args: {
    children: "Chip item",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Base: Story = {};
export const Active: Story = {
  args: {
    active: true,
  },
};
export const WithIcon: Story = {
  args: {
    children: (
      <>
        Chip with icon <Icon name="person" size="small" />
      </>
    ),
  },
};
export const Clickable: Story = {
  args: {
    onClick: () => console.log("clicked!"),
  },
};
export const Disabled: Story = {
  args: {
    onClick: () => console.log("clicked!"),
    disabled: true,
  },
};

export const Group: Story = {
  render: () => (
    <div className="chips-group">
      {Array.from({ length: 5 }).map((_, i) => (
        <Chip
          active={i === 2}
          onClick={i === 3 ? () => console.log("clicked") : undefined}
        >
          Chip item {i} {i == 4 && <Icon name="person" size="small" />}
        </Chip>
      ))}
    </div>
  ),
};
