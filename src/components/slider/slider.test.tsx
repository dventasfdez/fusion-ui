import React from "react";
import Slider from "./slider";
import renderer from "react-test-renderer";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const SliderTest: React.FC = (props: any) => {
  return <Slider {...props} className="stepone-ui" />;
};

it("Slider should render", () => {
  const component = renderer.create(<SliderTest />);

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

it("Slider should have labels", () => {
  const { getByText } = render(<Slider data-testid="slider" label={{ left: "left", right: "right " }} />);

  expect(getByText(/left/i)).toBeInTheDocument();
  expect(getByText(/right/i)).toBeInTheDocument();
});

it("Display max value of 15", () => {
  const { getByTestId } = render(<Slider data-testid="slider" max={15} />);

  const input = getByTestId("slider-input-test") as HTMLInputElement;

  expect(+input.max).toEqual(15);
});

it("Slider has defaultValue", () => {
  const { getByTestId } = render(<Slider defaultValue={4} data-testid="slider" max={15} />);

  const input = getByTestId("slider-input-test") as HTMLInputElement;

  expect(+input.value).toEqual(4);
});

it("Slider has tooltip", () => {
  const { getByTestId } = render(<Slider data-testid="slider" tooltip tooltipText="Text" max={20} min={0} />);

  const ttp = getByTestId("slider-tooltip-test");
  expect(ttp).toBeDefined();
});

it("Double Slider has tooltip", () => {
  const { getByTestId } = render(<Slider data-testid="slider" double tooltip tooltipText={{ min: "min", max: "max" }} max={20} min={0} />);

  const ttp = getByTestId("slider-tooltip-test");
  expect(ttp).toBeDefined();
});

it("Double Slider has tooltip without data-testid", () => {
  const { container } = render(<Slider double tooltip tooltipText={{ min: "min", max: "max" }} max={20} min={0} />);

  expect(container).toBeDefined();
});

it("Disabled Double Slider", () => {
  const { getByTestId } = render(<Slider data-testid="slider" double disabled max={20} min={0} />);

  const input = getByTestId("slider-input-test") as HTMLInputElement;
  const input2 = getByTestId("slider-input2-test") as HTMLInputElement;

  expect(input.disabled).toBeTruthy();
  expect(input2.disabled).toBeTruthy();
});

it("Slider pass onChange", () => {
  const onChange = jest.fn();

  const { getByTestId } = render(<Slider onChange={onChange} data-testid="slider" defaultValue={1} max={20} min={0} />);
  const slider = getByTestId("slider-input-test");

  fireEvent.change(slider, { target: { value: 5 } });

  expect(onChange).toBeCalledTimes(1);
});

it("Double Slider pass onChange", () => {
  const onChange = jest.fn();

  const { getByTestId } = render(<Slider double onChange={onChange} data-testid="slider" defaultValue={{ min: 1, max: 20 }} max={20} min={0} />);
  const slider = getByTestId("slider-input-test");

  fireEvent.change(slider, { target: { value: 5 } });

  expect(onChange).toBeCalledTimes(1);
});

test.skip("Double Slider pass onChange with inside out boundaries", () => {
  const onChange = jest.fn();

  const { getByTestId } = render(<Slider double onChange={onChange} data-testid="slider" defaultValue={{ min: 15, max: 10 }} max={20} min={0} />);
  const slider = getByTestId("slider-input-test");

  fireEvent.input(slider, { target: { value: 5 } });

  expect(onChange).toBeCalledTimes(1);
});

it("Double slider has tooltip", () => {
  const { getByTestId } = render(<Slider data-testid="slider" double tooltip tooltipText={{ min: "Text", max: "Text" }} max={20} min={0} />);

  const ttp = getByTestId("slider-tooltip-test");
  expect(ttp).toBeDefined();

  const ttp2 = getByTestId("slider-tooltip2-test");
  expect(ttp2).toBeDefined();
});

it("Double Slider should have labels", () => {
  const { getByText } = render(<Slider data-testid="slider" double label={{ left: "min", right: "max " }} max={20} min={0} />);

  expect(getByText(/min/i)).toBeInTheDocument();
  expect(getByText(/max/i)).toBeInTheDocument();
});

it("double Slider has default Values", () => {
  const { getByTestId } = render(<Slider data-testid="slider" double defaultValue={{ min: 4, max: 19 }} max={20} min={0} />);
  const input = getByTestId("slider-input-test") as HTMLInputElement;
  const input2 = getByTestId("slider-input2-test") as HTMLInputElement;

  expect(+input.value).toEqual(4);
  expect(+input2.value).toEqual(19);
});

it("Double SLider pass onChange", () => {
  const onChange = jest.fn();

  const { getByTestId } = render(<Slider onChange={onChange} data-testid="slider" double defaultValue={1} max={20} min={0} />);
  const slider = getByTestId("slider-input2-test");

  fireEvent.change(slider, { target: { value: 5 } });

  expect(onChange).toBeCalledTimes(1);
});

it("Move slider arrow up", () => {
  const onChange = jest.fn();
  const { getByTestId } = render(<Slider onChange={onChange} data-testid="slider" defaultValue={1} max={20} min={0} />);

  const slider = getByTestId("slider-input-test") as HTMLInputElement;
  slider.focus();
  fireEvent.keyDown(slider, { key: "ArrowUp", code: "ArrowUp", shiftKey: true });
  expect(slider.value).toBe("6");
});

it("Move slider arrow up no focus", () => {
  const onChange = jest.fn();
  const { getByTestId } = render(<Slider onChange={onChange} data-testid="slider" defaultValue={1} max={20} min={0} />);

  const slider = getByTestId("slider-input-test") as HTMLInputElement;
  fireEvent.keyDown(slider, { key: "ArrowUp", code: "ArrowUp", shiftKey: true });
  expect(slider.value).toBe("1");
});

it("Move slider arrow up no shift", () => {
  const onChange = jest.fn();
  const { getByTestId } = render(<Slider onChange={onChange} data-testid="slider" defaultValue={1} max={20} min={0} />);

  const slider = getByTestId("slider-input-test") as HTMLInputElement;
  slider.focus();
  fireEvent.keyDown(slider, { key: "ArrowUp", code: "ArrowUp" });
  expect(slider.value).toBe("1");
});

it("Move slider arrow up overflow max", () => {
  const onChange = jest.fn();
  const { getByTestId } = render(<Slider onChange={onChange} data-testid="slider" defaultValue={1} max={3} min={0} />);

  const slider = getByTestId("slider-input-test") as HTMLInputElement;
  slider.focus();
  fireEvent.keyDown(slider, { key: "ArrowUp", code: "ArrowUp", shiftKey: true });
  expect(slider.value).toBe("1");
});

it("Move slider arrow down", () => {
  const onChange = jest.fn();
  const { getByTestId } = render(<Slider onChange={onChange} data-testid="slider" defaultValue={10} max={20} min={0} />);

  const slider = getByTestId("slider-input-test") as HTMLInputElement;
  slider.focus();
  fireEvent.keyDown(slider, { key: "ArrowDown", code: "ArrowDown", shiftKey: true });
  expect(slider.value).toBe("5");
});

it("Move slider arrow down overflow max", () => {
  const onChange = jest.fn();
  const { getByTestId } = render(<Slider onChange={onChange} data-testid="slider" defaultValue={1} max={3} min={0} />);

  const slider = getByTestId("slider-input-test") as HTMLInputElement;
  slider.focus();
  fireEvent.keyDown(slider, { key: "ArrowDown", code: "ArrowDown", shiftKey: true });
  expect(slider.value).toBe("1");
});

it("Render withValueTrack with boundaries", () => {
  const { getByTestId } = render(<Slider data-testid="slider" withValueTrack defaultValue={1} max={20} min={0} />);

  const valueTrack = getByTestId("slider-value-track-test");
  expect(valueTrack).toBeDefined();
});

it("Render withValueTrack with boundaries no test-id", () => {
  const { container } = render(<Slider withValueTrack tooltipText="text" defaultValue={1} max={20} min={0} />);

  expect(container).toBeDefined();
});

it("Render DoubleSlider with tooltip", () => {
  const { getByTestId } = render(<Slider data-testid="slider" double defaultValue={{ min: 1, max: 10 }} max={20} min={0} tooltip tooltipText="yes" />);
  expect(getByTestId("slider-input-test")).toBeDefined();
  expect(getByTestId("slider-input-test")).toBeDefined();

  fireEvent.input(getByTestId("slider-input-test"), { target: { value: 5 } });
  fireEvent.input(getByTestId("slider-input2-test"), { target: { value: 15 } });
  expect(getByTestId("slider-input-test")).toBeDefined();
  expect(getByTestId("slider-input2-test")).toBeDefined();
});

it("Rerender min maxVal", () => {
  const { rerender, container } = render(<Slider data-testid="slider" defaultValue={1} max={20} min={0} />);
  rerender(<Slider data-testid="slider" defaultValue={3} max={10} min={0} />);
  expect(container).toBeDefined();
});

it("Rerender min maxVal without ref", () => {
  const { rerender, container } = render(<Slider data-testid="slider" defaultValue={1} max={20} min={0} />);
  rerender(<Slider data-testid="slider" defaultValue={3} max={10} min={0} />);
  expect(container).toBeDefined();
});

it("Render with disabled state", () => {
  const { getByTestId } = render(<Slider data-testid="slider" disabled defaultValue={1} max={20} min={0} />);
  const slider = getByTestId("slider-input-test") as HTMLInputElement;
  expect(slider.disabled).toBeTruthy();
});

it("Render Slider with custom onChange", () => {
  const onChange = jest.fn();
  const { getByTestId } = render(<Slider data-testid="slider" onChange={onChange} defaultValue={1} max={20} min={0} />);
  const slider = getByTestId("slider-input-test") as HTMLInputElement;
  fireEvent.change(slider, { target: { value: 5 } });
  expect(onChange).toBeCalledTimes(1);
});

it("Render Slider with custom bad onChange", () => {
  const onChange = null;
  // @ts-expect-error test bad onChange
  const { getByTestId } = render(<Slider data-testid="slider" onChange={onChange} defaultValue={1} max={20} min={0} />);
  const slider = getByTestId("slider-input-test") as HTMLInputElement;
  fireEvent.change(slider, { target: { value: 5 } });
  expect(onChange).toBe(null);
});

it("Render Double Slider with default boundaries", () => {
  const onChange = jest.fn();
  const { getByTestId } = render(<Slider double data-testid="slider" onChange={onChange} defaultValue={1} />);
  const slider = getByTestId("slider-input-test") as HTMLInputElement;
  fireEvent.change(slider, { target: { value: 5 } });
  expect(onChange).toBeCalledTimes(1);
});
