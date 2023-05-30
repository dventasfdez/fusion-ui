import React, { useRef, useState } from "react";
import Drawer, { DrawerFooter, IDrawerProps } from "./drawer";
import DrawerHeader from "./drawerHeader";
import DrawerBody from "./drawerBody";
import { fireEvent, render } from "@testing-library/react";

const DrawerParent = () => {
  const parentRef = useRef<HTMLButtonElement>(null);
  const [show, setShow] = useState(false);
  return (
    <div>
      <button data-testid="button-parent" className="parent" ref={parentRef} onClick={() => setShow(true)}>
        Parent
      </button>
      <button data-testid="button-brother" className="brother">
        Button
      </button>
      <Drawer parentRef={parentRef} renderAsPortal open={show}>
        <DrawerHeader data-testid="drawer-header">My Title</DrawerHeader>
        <DrawerBody data-testid="drawer-body">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio aperiam libero hic dolorum veritatis, necessitatibus, neque suscipit autem nostrum repellat corporis nihil, a saepe est. Autem
          beatae sunt debitis quasi!
        </DrawerBody>
        <DrawerFooter>Lorem ipsum dolor sit amet.</DrawerFooter>
      </Drawer>
    </div>
  );
};

describe("Drawer snapshots", () => {
  it("Drawer default", () => {
    const { container } = render(
      <Drawer open>
        <DrawerHeader>My Title</DrawerHeader>
        <DrawerBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio aperiam libero hic dolorum veritatis, necessitatibus, neque suscipit autem nostrum repellat corporis nihil, a saepe est. Autem
          beatae sunt debitis quasi!
        </DrawerBody>
      </Drawer>
    );
    expect(container).toMatchSnapshot();
  });
  it("Drawer with parent", () => {
    const root = document.createElement("div");
    root.setAttribute("id", "root");
    const { container, getByTestId } = render(<DrawerParent />, { container: root });
    const parent = getByTestId("button-parent");
    fireEvent.click(parent);
    expect(container).toMatchSnapshot();
  });
});

describe("Drawer funcionality", () => {
  it("Display drawer with close button", () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <Drawer onClose={onClose} open renderAsPortal>
        <DrawerHeader>My Title</DrawerHeader>
        <DrawerBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio aperiam libero hic dolorum veritatis, necessitatibus, neque suscipit autem nostrum repellat corporis nihil, a saepe est. Autem
          beatae sunt debitis quasi!
        </DrawerBody>
      </Drawer>
    );
    const closeBtn = getByTestId("drawer-icon-close");
    expect(closeBtn).toBeDefined();
    fireEvent.click(closeBtn);
    expect(onClose).toBeCalled();
  });
  it("Display drawer with close button and click outside", () => {
    const onClose = jest.fn();
    const { getByTestId } = render(
      <>
        <div data-testid="div">DIV</div>
        <Drawer onClose={onClose} open renderAsPortal>
          <DrawerHeader>My Title</DrawerHeader>
          <DrawerBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio aperiam libero hic dolorum veritatis, necessitatibus, neque suscipit autem nostrum repellat corporis nihil, a saepe est.
            Autem beatae sunt debitis quasi!
          </DrawerBody>
        </Drawer>
      </>
    );
    const div = getByTestId("div");
    fireEvent.click(div);
    expect(onClose).toBeCalled();
  });
  it("Display drawer with back button", () => {
    const onBack = jest.fn();
    const { getByTestId } = render(
      <Drawer onBack={onBack} open>
        <DrawerHeader>My Title</DrawerHeader>
        <DrawerBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio aperiam libero hic dolorum veritatis, necessitatibus, neque suscipit autem nostrum repellat corporis nihil, a saepe est. Autem
          beatae sunt debitis quasi!
        </DrawerBody>
      </Drawer>
    );
    const backBtn = getByTestId("drawer-icon-back");
    expect(backBtn).toBeDefined();
    fireEvent.click(backBtn);
    expect(onBack).toBeCalled();
  });
});
