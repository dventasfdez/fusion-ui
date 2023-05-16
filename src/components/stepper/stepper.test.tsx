import React from "react";
import Stepper, { Step } from "./stepper";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react";

const StepperTest = (props: any) => (
  <Stepper {...props}>
    <Step name="Step Name" detail="optional" status="success" data-testid="step" />
    <Step name="Step Name" detail="optional" status="pending" />
    <Step name="Step Name" detail="optional" status="disabled" />
    <Step name="Step Name" detail="optional" status="active" />
    <Step name="Step Name" detail="optional" status="error" />
    <Step name="Step Name" detail="optional" status="default" numbered />
    {props.nonValid && <div>Non valid</div>}
  </Stepper>
);

it("Render Stepper and match snapshot", () => {
  const component = renderer.create(<StepperTest data-testid="stepper" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("render stepper vertical", () => {
  const component = render(<StepperTest vertical />);
  expect(component).toBeDefined();
});

it("render with mobile", () => {
  window = Object.assign(window, { innerWidth: 600 });
  const component = render(<StepperTest />);
  expect(component).toBeDefined();
});

it("render with fake onClick", () => {
  window = Object.assign(window, { innerWidth: 1024 });
  const onClick = "string";
  const component = render(<StepperTest onClickStep={onClick} />);
  const step = component.getByTestId("step-item-0");
  fireEvent.click(step);
  expect(onClick).toBe("string");
});

it("render with onClick", () => {
  const onClick = jest.fn();

  window = Object.assign(window, { innerWidth: 1024 });
  const component = render(<StepperTest onClickStep={onClick} data-testid="stepper" />);
  const step = component.getByTestId("step-item-0");
  fireEvent.click(step);
  expect(onClick).toHaveBeenCalled();
});

it("render with non valid children", () => {
  const component = render(<StepperTest nonValid />);
  expect(component).toBeDefined();
});
