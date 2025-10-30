import type { Meta, StoryObj } from "@storybook/react";
import Breadcrumb, { BreadcrumbItem } from "./breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  render: (args) => (
    <div style={{ height: 350 }}>
      <Breadcrumb {...args} />
    </div>
  ),
  tags: ["autodocs"],
  args: {
    className: "fusion-ui",
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Base: Story = {
  args: {
    children: Array.from({ length: 3 }, (_, i) => i + 1).map((num) => (
      <BreadcrumbItem
        key={`Item ${num}`}
        id={`Item ${num}`}
        title={`Item ${num}`}
        href="#"
      />
    )),
  },
};

export const Dropdown: Story = {
  args: {
    children: Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
      <BreadcrumbItem
        key={`Item ${num}`}
        id={`Item ${num}`}
        title={`Item ${num}`}
        href="#"
      />
    )),
  },
};
