import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Button from "./button";

describe("Button snapshots", () => {
  it("Button", () => {
    const { container } = render(<Button>Button</Button>);
    expect(container).toMatchSnapshot();
  });
});

describe("Button filled and sizes", () => {
  it("Button primary", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="primary">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_primary");
  });

  it("Button primary small", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="primary" size="small">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_primary button_small");
  });

  it("Button primary large", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="primary" size="large">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_primary button_large");
  });

  it("Button secondary", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="secondary">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_secondary");
  });

  it("Button secondary small", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="secondary" size="small">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_secondary button_small");
  });

  it("Button secondary large", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="secondary" size="large">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_secondary button_large");
  });

  it("Button success", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="success">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_success");
  });

  it("Button success small", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="success" size="small">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_success button_small");
  });

  it("Button success large", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="success" size="large">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_success button_large");
  });

  it("Button error", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="error">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_error");
  });

  it("Button error small", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="error" size="small">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_error button_small");
  });

  it("Button error large", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="error" size="large">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_error button_large");
  });

  it("Button warning", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="warning">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_warning");
  });

  it("Button warning small", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="warning" size="small">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_warning button_small");
  });

  it("Button warning large", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="warning" size="large">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_warning button_large");
  });
});

describe("Button outlined and sizes", () => {
  it("Button primary", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="primary" appearance="outlined">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_primary");
  });

  it("Button primary small", () => {
    const { getByTestId } = render(
      <Button
        data-testid="button-test"
        color="primary"
        size="small"
        appearance="outlined"
      >
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_primary button_small");
  });

  it("Button primary large", () => {
    const { getByTestId } = render(
      <Button
        data-testid="button-test"
        color="primary"
        size="large"
        appearance="outlined"
      >
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_primary button_large");
  });

  it("Button secondary", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="secondary" appearance="outlined">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_secondary");
  });

  it("Button secondary small", () => {
    const { getByTestId } = render(
      <Button
        data-testid="button-test"
        color="secondary"
        size="small"
        appearance="outlined"
      >
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_secondary button_small");
  });

  it("Button secondary large", () => {
    const { getByTestId } = render(
      <Button
        data-testid="button-test"
        color="secondary"
        size="large"
        appearance="outlined"
      >
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_secondary button_large");
  });

  it("Button success", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="success" appearance="outlined">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_success");
  });

  it("Button success small", () => {
    const { getByTestId } = render(
      <Button
        data-testid="button-test"
        color="success"
        size="small"
        appearance="outlined"
      >
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_success button_small");
  });

  it("Button success large", () => {
    const { getByTestId } = render(
      <Button
        data-testid="button-test"
        color="success"
        size="large"
        appearance="outlined"
      >
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_success button_large");
  });

  it("Button error", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="error" appearance="outlined">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_error");
  });

  it("Button error small", () => {
    const { getByTestId } = render(
      <Button
        data-testid="button-test"
        color="error"
        size="small"
        appearance="outlined"
      >
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_error button_small");
  });

  it("Button error large", () => {
    const { getByTestId } = render(
      <Button
        data-testid="button-test"
        color="error"
        size="large"
        appearance="outlined"
      >
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_error button_large");
  });

  it("Button warning", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="warning" appearance="outlined">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_warning");
  });

  it("Button warning small", () => {
    const { getByTestId } = render(
      <Button
        data-testid="button-test"
        color="warning"
        size="small"
        appearance="outlined"
      >
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_warning button_small");
  });

  it("Button warning large", () => {
    const { getByTestId } = render(
      <Button
        data-testid="button-test"
        color="warning"
        size="large"
        appearance="outlined"
      >
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_warning button_large");
  });
});

describe("Button text and sizes", () => {
  it("Button primary", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="primary" appearance="text">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_primary");
  });

  it("Button primary small", () => {
    const { getByTestId } = render(
      <Button
        data-testid="button-test"
        color="primary"
        size="small"
        appearance="text"
      >
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_primary button_small");
  });

  it("Button primary large", () => {
    const { getByTestId } = render(
      <Button
        data-testid="button-test"
        color="primary"
        size="large"
        appearance="text"
      >
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_primary button_large");
  });

  it("Button secondary", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="secondary" appearance="text">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_secondary");
  });

  it("Button secondary small", () => {
    const { getByTestId } = render(
      <Button
        data-testid="button-test"
        color="secondary"
        size="small"
        appearance="text"
      >
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_secondary button_small");
  });

  it("Button secondary large", () => {
    const { getByTestId } = render(
      <Button
        data-testid="button-test"
        color="secondary"
        size="large"
        appearance="text"
      >
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_secondary button_large");
  });

  it("Button success", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="success" appearance="text">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_success");
  });

  it("Button success small", () => {
    const { getByTestId } = render(
      <Button
        data-testid="button-test"
        color="success"
        size="small"
        appearance="text"
      >
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_success button_small");
  });

  it("Button success large", () => {
    const { getByTestId } = render(
      <Button
        data-testid="button-test"
        color="success"
        size="large"
        appearance="text"
      >
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_success button_large");
  });

  it("Button error", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="error" appearance="text">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_error");
  });

  it("Button error small", () => {
    const { getByTestId } = render(
      <Button
        data-testid="button-test"
        color="error"
        size="small"
        appearance="text"
      >
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_error button_small");
  });

  it("Button error large", () => {
    const { getByTestId } = render(
      <Button
        data-testid="button-test"
        color="error"
        size="large"
        appearance="text"
      >
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_error button_large");
  });

  it("Button warning", () => {
    const { getByTestId } = render(
      <Button data-testid="button-test" color="warning" appearance="text">
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_warning");
  });

  it("Button warning small", () => {
    const { getByTestId } = render(
      <Button
        data-testid="button-test"
        color="warning"
        size="small"
        appearance="text"
      >
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_warning button_small");
  });

  it("Button warning large", () => {
    const { getByTestId } = render(
      <Button
        data-testid="button-test"
        color="warning"
        size="large"
        appearance="text"
      >
        Button
      </Button>
    );
    const btn = getByTestId("button-test");
    expect(btn).toHaveClass("button_warning button_large");
  });
});
