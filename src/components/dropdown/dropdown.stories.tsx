import type { Meta, StoryObj } from "@storybook/react";
import Dropdown, { DropdownButton, DropdownMenu } from "./dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  render: (args) => (
    <div style={{ height: 350 }}>
      <Dropdown {...args}>
        <DropdownButton>Dropdown</DropdownButton>
        <DropdownMenu>
          {Array.from({ length: 3 }, (_, index) => (
            <div key={index} className="dropdown-item">
              Item {index + 1}
            </div>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  ),
  component: Dropdown,
  tags: ["autodocs"],
  args: {
    className: "fusion-ui",
  },
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {};
