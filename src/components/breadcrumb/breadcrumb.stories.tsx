import type { Meta, StoryObj } from "@storybook/react";
import Breadcrumb, { BreadcrumbItem } from "./breadcrumb";
import { Fragment } from "react";

const meta: Meta<typeof Breadcrumb> = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
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

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Base: Story = {
  args: { className: "fusion-ui" },
};
