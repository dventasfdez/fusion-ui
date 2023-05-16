import React from "react";
import Rating from "./rating";
import { render } from "@testing-library/react";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";

it("Rating should render and match snapshot", () => {
  const component = renderer.create(<Rating amount={10} onRate={() => null} label={{ left: "0 - Not likely", right: "Very likely - 10" }} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("On rate should be called", () => {
  const onRate = jest.fn();
  const { getByText } = render(<Rating amount={10} onRate={onRate} label={{ left: "0 - Not likely", right: "Very likely - 10" }} />);
  const button = getByText("1");
  userEvent.click(button);
  expect(onRate).toBeCalled();
});

it("Render Rating with label", () => {
  const { getByText } = render(<Rating amount={10} onRate={() => null} label={{ left: "0 - Not likely", right: "Very likely - 10" }} />);
  expect(getByText("0 - Not likely")).toBeInTheDocument();
  expect(getByText("Very likely - 10")).toBeInTheDocument();
});

it("Render Rating without label", () => {
  const { queryByText } = render(<Rating amount={10} onRate={() => null} />);
  expect(queryByText("0 - Not likely")).not.toBeInTheDocument();
});
