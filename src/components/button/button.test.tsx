import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Button from "./button";

describe("Button snapshots", () => {
  it("Button", () => {
    const { container } = render(<Button>Button</Button>);
    expect(container).toMatchSnapshot();
  });
});
describe("Button funcionality", () => {
  it("Button primary", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" primary>
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button-primary");
  });

  it("Button primary small", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" primary small>
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button-primary small");
  });

  it("Button primary large", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" primary large>
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button-primary large");
  });

  it("Button primary icon left", () => {
    const { getByTestId } = render(
      <Button primary icon={{ value: "face", position: "left" }}>
        Button
      </Button>
    );
    const icon = getByTestId("button-icon");
    expect(icon).toHaveClass("material-icons left");
  });

  it("Button primary icon right", () => {
    const { getByTestId } = render(
      <Button primary icon={{ value: "face", position: "right" }}>
        Button
      </Button>
    );
    const icon = getByTestId("button-icon");
    expect(icon).toHaveClass("material-icons right");
  });

  it("Button secondary", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" secondary>
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button-secondary");
  });

  it("Button cta", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" cta>
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button-cta");
  });

  it("Button interactive", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" interactive>
        <span className="material-icons">face</span>
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button-interactive");
  });

  it("Button full width", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" fullWidth>
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button full-width");
  });
});
