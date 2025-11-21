import type { Meta, StoryObj } from "@storybook/react-vite";
import Drawer, { DrawerHeader, DrawerBody, DrawerFooter } from "./drawer";
import Button from "../button/button";
import { useRef, useState } from "react";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  subcomponents: { DrawerHeader, DrawerBody, DrawerFooter },
  tags: ["autodocs"],
  render: ({ open, onClose, ...args }) => {
    const [openState, setOpenState] = useState(false);
    return (
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore minus
          repudiandae, ratione amet pariatur blanditiis aliquam nihil molestias
          magnam explicabo quidem maxime praesentium, dignissimos atque ducimus
          voluptas. Voluptatum, rem? Voluptate temporibus, numquam maxime
          reiciendis eius similique aperiam porro consequatur nam cumque est
          earum deserunt placeat nisi facere aut a quibusdam.
        </p>
        <Button onClick={() => setOpenState(true)}>Open Drawer</Button>
        <Drawer open={openState} onClose={() => setOpenState(false)} {...args}>
          <DrawerHeader>Drawer Header</DrawerHeader>
          <DrawerBody>
            <p>This is the content of the drawer.</p>
            <p>You can put any elements here.</p>
          </DrawerBody>
          <DrawerFooter>Drawer Footer</DrawerFooter>
        </Drawer>
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Base: Story = {};
export const OpenedDrawer: Story = {
  args: {
    open: true,
  },
};
