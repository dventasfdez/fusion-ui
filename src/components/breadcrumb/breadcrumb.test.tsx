import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Breadcrumb, { BreadcrumbItem } from "./breadcrumb";

describe("Breadcrumb snapshots", () => {
  it("Breadcrumb", () => {
    const { container } = render(
      <Breadcrumb>
        <BreadcrumbItem key="Item 1" id="Item 1" title="Item 1" href="#" />
        <BreadcrumbItem key="Item 2" id="Item 2" title="Item 2" href="#" />
      </Breadcrumb>
    );
    expect(container).toMatchSnapshot();
  });
});
describe("Breadcrumb funcionality", () => {
  it("Breadcrumb with dropdown when there have more than 4 items", () => {
    const { getByTestId } = render(
      <Breadcrumb data-testid="breadcrumb-test">
        <BreadcrumbItem key="Item 1" id="Item 1" title="Item 1" href="#" />
        <BreadcrumbItem key="Item 2" id="Item 2" title="Item 2" href="#" />
        <BreadcrumbItem key="Item 3" id="Item 3" title="Item 3" href="#" />
        <BreadcrumbItem key="Item 4" id="Item 4" title="Item 4" href="#" />
        <BreadcrumbItem key="Item 5" id="Item 5" title="Item 5" href="#" />
        <BreadcrumbItem key="Item 6" id="Item 6" title="Item 6" href="#" />
        <BreadcrumbItem key="Item 7" id="Item 7" title="Item 7" href="#" />
      </Breadcrumb>
    );
    const dropdown = getByTestId("breadcrumb-test-dropdown");
    expect(dropdown).toBeDefined();
  });

  it("Breadcrumb with item text truncated when it has more than 30 characters", () => {
    const { getByTestId } = render(
      <Breadcrumb>
        <BreadcrumbItem key="Item 1" id="Item 1" title="Item 1" href="#" />
        <BreadcrumbItem key="Item 2" id="Item 2" title="Item 2" href="#" />
        <BreadcrumbItem key="Item 3" id="Item 3" title="Item 3" href="#" />
        <BreadcrumbItem key="Item 4" id="Item 4" title="Item 4" href="#" />
        <BreadcrumbItem key="Item 5" id="Item 5" title="Item 5" href="#" />
        <BreadcrumbItem key="Item 6" id="Item 6" title="Item 6 with more than 30 characters collapsed" href="#" data-testid="item-6" />
      </Breadcrumb>
    );
    const breadcrumbToTruncate = getByTestId("item-6");
    expect(breadcrumbToTruncate).toHaveTextContent("Item 6 with more than 30 chara...");
  });
});
