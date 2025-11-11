import type { Meta, StoryObj } from "@storybook/react-vite";
import Tabs, { TabItem } from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  args: {
    children: Array.from({ length: 5 }, (_, i) => (
      <TabItem id={`item${i}`} title={`Tab ${i}`}>
        Item {i}.<br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam nihil
        minus eius beatae possimus, cum mollitia nulla repellat incidunt porro
        alias numquam ea quaerat provident dolores aliquam natus eveniet
        doloribus laboriosam inventore? Excepturi earum quis expedita fuga
        deleniti sit eum distinctio aspernatur, harum iste dolore reprehenderit
        quasi incidunt dicta blanditiis!
      </TabItem>
    )),
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Base: Story = {};
