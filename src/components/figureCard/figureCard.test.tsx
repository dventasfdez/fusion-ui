import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FigureCard, { FigureCardBody, FigureCardFigure, FigureCardFloatIcon, FigureCardHeader } from "./figureCard";

describe("Figure card snapshots", () => {
  test("Figure card", () => {
    const { container } = render(
      <FigureCard>
        <FigureCardFigure>00</FigureCardFigure>

        <FigureCardFloatIcon>
          <span>collections</span>
        </FigureCardFloatIcon>

        <FigureCardHeader>
          <h4>This is a title</h4>
        </FigureCardHeader>

        <FigureCardBody>This is a Figure in horizontal disposition</FigureCardBody>
      </FigureCard>
    );
    expect(container).toMatchSnapshot();
  });

  // test("Figure card accent component should render", () => {
  //   const component = renderer.create(figureCardExample({ accent: true }));
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // test("Figure card selected component should render", () => {
  //   const component = renderer.create(figureCardExample({ selected: true }));
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // test("Figure card component without content childrens should render", () => {
  //   const component = renderer.create(figureCardExample({ notHeader: true, notBody: true }));
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // test("Figure card component without header childrens should render", () => {
  //   const component = renderer.create(figureCardExample({ notHeader: true }));
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // test("Figure card component without body childrens should render", () => {
  //   const component = renderer.create(figureCardExample({ notBody: true }));
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // test("Figure card component without icon children in float icon should render", () => {
  //   const component = renderer.create(figureCardExample({ notIcon: true }));
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // test("Figure card component without icon class name in float icon should render", () => {
  //   const component = renderer.create(figureCardExample({ withoutClassName: true }));
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});

describe("Figure card funcionality", () => {
  it("Figure card only with number", () => {
    const { getByTestId } = render(
      <FigureCard data-testid="figure-card">
        <FigureCardFigure>00</FigureCardFigure>
      </FigureCard>
    );
    const card = getByTestId("figure-card");
    expect(card).toMatchSnapshot();
    expect(card).toHaveAttribute("style", "width: fit-content");
  });
});
