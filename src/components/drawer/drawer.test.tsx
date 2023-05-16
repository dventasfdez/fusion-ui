import React, { createRef, useState } from "react";
import Drawer, { DrawerFooter, IDrawerProps } from "./drawer";
import DrawerHeader from "./drawerHeader";
import DrawerBody from "./drawerBody";
import { fireEvent, render } from "@testing-library/react";
import renderer from "react-test-renderer";

const DrawerTest = (props: IDrawerProps) => {
  return (
    <Drawer data-testid="drawer-test" {...props}>
      <DrawerHeader data-testid="drawer-header">My Title</DrawerHeader>
      <DrawerBody data-testid="drawer-body">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio aperiam libero hic dolorum veritatis, necessitatibus, neque suscipit autem nostrum repellat corporis nihil, a saepe est. Autem
        beatae sunt debitis quasi!
      </DrawerBody>
    </Drawer>
  );
};
const DrawerTestWithoutTestId = (props: IDrawerProps) => {
  return (
    <Drawer {...props}>
      <DrawerHeader data-testid="drawer-header">My Title</DrawerHeader>
      <DrawerBody data-testid="drawer-body">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio aperiam libero hic dolorum veritatis, necessitatibus, neque suscipit autem nostrum repellat corporis nihil, a saepe est. Autem
        beatae sunt debitis quasi!
      </DrawerBody>
      <DrawerFooter>Drawer Footer</DrawerFooter>
    </Drawer>
  );
};
const DrawerTestWithParent = () => {
  const parentRef = createRef<HTMLButtonElement>();
  const [openTest, setOpen] = useState(false);
  return (
    <div id="root">
      <button data-testid="button-parent" className="parent" ref={parentRef} onClick={() => setOpen(true)}>
        Parent
      </button>
      <button data-testid="button-brother" className="brother">
        Button
      </button>
      <Drawer data-testid="drawer-test" renderAsPortal open={openTest} onClose={() => setOpen(false)} onBack={() => setOpen(false)}>
        <DrawerHeader data-testid="drawer-header">My Title</DrawerHeader>
        <DrawerBody data-testid="drawer-body">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio aperiam libero hic dolorum veritatis, necessitatibus, neque suscipit autem nostrum repellat corporis nihil, a saepe est. Autem
          beatae sunt debitis quasi!
        </DrawerBody>
      </Drawer>
    </div>
  );
};

it("Drawer default", () => {
  const component = renderer.create(<DrawerTest open />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
it("Drawer without test ids", () => {
  const component = renderer.create(<DrawerTestWithoutTestId open />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("Display drawer with close button", () => {
  const { getByTestId } = render(<DrawerTestWithParent />);
  const drawerShowBtn = getByTestId("button-parent");
  if (drawerShowBtn) fireEvent.click(drawerShowBtn);
  const closeBtn = getByTestId("drawer-test-icon-close");
  expect(closeBtn).toBeDefined();
});

it("Close drawer when close button is clicked", () => {
  const { container, getByTestId } = render(<DrawerTestWithParent />);
  const drawerShowBtn = getByTestId("button-parent");
  if (drawerShowBtn) fireEvent.click(drawerShowBtn);
  const closeBtn = getByTestId("drawer-test-icon-close");
  expect(closeBtn).toBeDefined();
  expect(getByTestId("drawer-test")).toBeDefined();
  if (closeBtn) fireEvent.click(closeBtn);
  expect(container.getElementsByClassName("drawer-test").length).toBe(0);
});

it("Close drawer when close outside is clicked", () => {
  const { container, getByTestId } = render(<DrawerTestWithParent />);
  const drawerShowBtn = getByTestId("button-parent");
  const drawerShowBtn2 = getByTestId("button-brother");
  if (drawerShowBtn) fireEvent.click(drawerShowBtn);
  const closeBtn = getByTestId("drawer-test-icon-close");
  expect(closeBtn).toBeDefined();
  expect(getByTestId("drawer-test")).toBeDefined();
  if (drawerShowBtn2) fireEvent.click(drawerShowBtn2);
  expect(container.getElementsByClassName("drawer-test").length).toBe(0);
});

it("Display drawer with back button", () => {
  const { getByTestId } = render(<DrawerTestWithParent />);
  const drawerShowBtn = getByTestId("button-parent");
  if (drawerShowBtn) fireEvent.click(drawerShowBtn);
  const backBtn = getByTestId("drawer-test-icon-close");
  expect(backBtn).toBeDefined();
});
