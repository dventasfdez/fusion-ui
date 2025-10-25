import { render } from "@testing-library/react";
import Badge from "./badge";

describe("Badge snapshots", () => {
  it("Badge Empty", () => {
    const { container } = render(<Badge />);
    expect(container).toMatchSnapshot();
  });
  it("Badge", () => {
    const { container } = render(<Badge>8</Badge>);
    expect(container).toMatchSnapshot();
  });
  it("Badge Small", () => {
    const { container } = render(<Badge size="small">8</Badge>);
    expect(container).toMatchSnapshot();
  });
  it("Badge Success", () => {
    const { container } = render(<Badge color="success">8</Badge>);
    expect(container).toMatchSnapshot();
  });
  it("Badge Error", () => {
    const { container } = render(<Badge color="error">8</Badge>);
    expect(container).toMatchSnapshot();
  });
});
