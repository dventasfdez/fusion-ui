import type { Meta, StoryObj } from "@storybook/react-vite";
import Tabs, { TabItem } from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  args: {
    children: Array.from({ length: 5 }, (_, i) => (
      <TabItem id={`item${i}`} title={`Tab ${i}`}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
          saepe doloribus nisi quis consectetur numquam blanditiis accusamus
          dolor ipsam aspernatur aperiam aut accusantium, itaque quasi magni
          enim exercitationem repellat? Obcaecati. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur
          adipisicing elit.
        </p>
      </TabItem>
    )),
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Base: Story = {};
