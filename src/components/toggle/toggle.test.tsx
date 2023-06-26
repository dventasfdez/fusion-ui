import React from "react";
import Toggle from "./toggle";
import renderer from "react-test-renderer";
import ReactTestUtils from "react-dom/test-utils";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";

const ToggleCombinations = () => {
  return (
    <>
      <Toggle className="fusion-ui" />
      <Toggle className="fusion-ui" id="small-toggle" small />
      <Toggle className="fusion-ui" id="toggle-checked" checked />
      <Toggle className="fusion-ui" id="small-toggle-checked" small checked />
      <Toggle className="fusion-ui" id="toggle-disabled" disabled />
      <Toggle className="fusion-ui" id="small-toggle-disabled" small disabled />
      <Toggle className="fusion-ui" id="toggle-readOnly" readOnly />
      <Toggle className="fusion-ui" id="small-toggle-readOnly" small readOnly />
      <Toggle className="fusion-ui" id="toggle-checked-disabled" checked disabled />
      <Toggle className="fusion-ui" id="small-toggle-checked-disabled" small checked disabled />
      <Toggle className="fusion-ui" id="toggle-label" label="I am label for #toggle-label" />
      <Toggle className="fusion-ui" id="small-toggle-label" small label="I am label for #toggle-label" />
      <Toggle className="fusion-ui" id="toggle-helper-text" helperTextOff="off" helperTextOn="on" />
      <Toggle className="fusion-ui" id="small-toggle-helper-text" small helperTextOff="off" helperTextOn="on" />
    </>
  );
};

it("Toggle combinations render", () => {
  const component = renderer.create(<ToggleCombinations />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("Click action toggle component", () => {
  const { container, getByTestId } = render(<Toggle data-testid="toggle-test" helperTextOn="on" helperTextOff="off" />);
  const toggleContainer = container.querySelector(".toggle")?.querySelector(".toggle-container");
  if (toggleContainer) {
    expect(toggleContainer.querySelectorAll(".toggle-pill")?.length).toBe(1);
    const togglePill = toggleContainer.querySelector(".toggle-pill");

    if (togglePill) {
      const toggle = getByTestId("toggle-test-input");
      if (toggle) {
        expect(toggle).not.toBeChecked();
        ReactTestUtils.Simulate.change(toggle);
        expect(toggleContainer.querySelectorAll(".toggle-pill_checked").length).toBe(1);
        expect(toggleContainer.querySelector(".toggle-pill_checked")?.querySelectorAll("#toggle").length).toBe(1);
        expect(toggleContainer.querySelector(".toggle-pill_checked")?.querySelector("#toggle")).toBeChecked();

        ReactTestUtils.Simulate.change(toggle);

        expect(toggleContainer.querySelectorAll(".toggle-pill")?.length).toBe(1);
        expect(toggle).not.toBeChecked();
      }
    }
  }
  document.body.removeChild(container);
});

it("Click on toggle with onChange (non-function)", () => {
  const onChange = "string";
  // @ts-expect-error non-function onChange
  const { getByTestId } = render(<Toggle data-testid="toggle-test" onChange={onChange} />);
  // const toggleContainer = container.querySelector('.toggle')?.querySelector('.toggle-container');
  fireEvent.click(getByTestId("toggle-test"));
  expect(onChange).toBe("string");
});

it("Click on toggle with onChange (function)", () => {
  const onChange = jest.fn();
  const { getByTestId } = render(<Toggle data-testid="toggle-test" onChange={onChange} />);
  fireEvent.click(getByTestId("toggle-test-input"));
  expect(onChange).toBeCalled();
});

it("Toggle change checked prop", () => {
  const { rerender, getByTestId } = render(<Toggle data-testid="toggle-test" />);
  expect(getByTestId("toggle-test")).not.toBeChecked();
  rerender(<Toggle data-testid="toggle-test" checked />);
  expect(getByTestId("toggle-test-input")).toBeChecked();
});

it("Toggle with no testId", () => {
  const _ = render(<Toggle readOnly disabled />);
  // test unable to find an elment by testId
  expect(_).toBeTruthy();
  // expect(() => getByTestId('toggle-test')).toThrow();
});
