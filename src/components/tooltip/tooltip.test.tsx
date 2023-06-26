import React, { useRef } from "react";
import Tooltip from "./tooltip";
import { fireEvent, prettyDOM, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const TooltipTest: React.FC = (props: any) => {
  const buttonRef = useRef(null);

  return (
    <div id="root">
      <button data-testid="tooltip-btn" ref={buttonRef} id="parent" {...props.btnOptions}>
        I have a tooltip
      </button>
      <Tooltip className="fusion-ui" data-testid="tooltip" parentRef={buttonRef}>
        I am a tooltip
      </Tooltip>
    </div>
  );
};

it("Tooltip render when mouse out and leave ", () => {
  const { container, getByTestId } = render(<TooltipTest />);

  const tooltipBtn = getByTestId("tooltip-btn");

  if (tooltipBtn) userEvent.hover(tooltipBtn);
  expect(getByTestId("tooltip")).toBeDefined();
  expect(container.getElementsByClassName("tooltip").length).toBe(1);
  if (tooltipBtn) userEvent.unhover(tooltipBtn);
  expect(container.getElementsByClassName("tooltip").length).toBe(0);
});

const ToolTipPosition = () => {
  const buttonRef = useRef(null);
  return (
    <div id="root">
      <button data-testid="tooltip-btn" ref={buttonRef} id="parent" style={{ width: "10px", padding: 0, minWidth: "0" }}>
        I have a tooltip
      </button>
      <Tooltip className="fusion-ui" data-testid="tooltip" parentRef={buttonRef}>
        I am a tooltip
      </Tooltip>
    </div>
  );
};

it("Render tooltip at the right", async () => {
  // mock parentRef
  jest.spyOn(React, "useRef").mockImplementationOnce(() => ({
    current: {
      getBoundingClientRect: () => ({
        width: 10,
        height: 10,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        toJSON: () => null,
      }),
    },
  }));
  const { container, getByTestId } = render(<ToolTipPosition />);
  Object.defineProperty(document.body, "clientWidth", { writable: true, configurable: true, value: 1286 });
  const tooltipBtn = getByTestId("tooltip-btn");
  if (tooltipBtn) fireEvent.mouseEnter(tooltipBtn);
  await waitFor(() => expect(getByTestId("tooltip")).toBeDefined());
  expect(container.getElementsByClassName("tooltip").length).toBe(1);
});
