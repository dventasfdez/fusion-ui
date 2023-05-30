import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import IconCard, { IconCardIcon, IconCardHeader, IconCardBody, IconCardFooter } from "./iconCard";

describe("Icon card snapshots", () => {
  it("Icon card component should render", () => {
    const { container } = render(
      <IconCard>
        <IconCardIcon>
          <span className="material-icons">collections</span>
        </IconCardIcon>
        <IconCardHeader>
          <h4>This is a title</h4>
        </IconCardHeader>
        <IconCardBody>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, excepturi.</IconCardBody>
        <IconCardFooter>
          <a href="">link</a>
        </IconCardFooter>
      </IconCard>
    );
    expect(container).toMatchSnapshot();
  });
});
describe("Icon card functionality", () => {
  it("Icon card component should render", () => {
    const { getByTestId } = render(
      <IconCard selected data-testid="icon-card">
        <IconCardIcon>
          <span className="material-icons">collections</span>
        </IconCardIcon>
        <IconCardHeader>
          <h4>This is a title</h4>
        </IconCardHeader>
        <IconCardBody>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, excepturi.</IconCardBody>
        <IconCardFooter>
          <a href="">link</a>
        </IconCardFooter>
      </IconCard>
    );
    const card = getByTestId("icon-card");
    expect(card).toHaveClass("card_icon_selected");
  });
});
