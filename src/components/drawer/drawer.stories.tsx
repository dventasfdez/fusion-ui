import type { Meta, StoryObj } from "@storybook/react-vite";
import Drawer, { DrawerHeader, DrawerBody, DrawerFooter } from "./drawer";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  subcomponents: { DrawerHeader, DrawerBody, DrawerFooter },
  tags: ["autodocs"],
  render: (args) => (
    <Drawer {...args}>
      <DrawerHeader>Drawer Header</DrawerHeader>
      <DrawerBody>
        <p>This is the content of the drawer.</p>
        <p>You can put any elements here.</p>
      </DrawerBody>
      <DrawerFooter>Drawer Footer</DrawerFooter>
    </Drawer>
  ),
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Base: Story = {};
