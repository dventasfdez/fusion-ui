import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FigureCard, { FigureCardBody, FigureCardFigure, FigureCardFloatIcon, FigureCardHeader } from "./figureCard";

describe("Figure card snapshots", () => {
  it("Figure card", () => {
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
});

describe("Figure card funcionality", () => {
  it("Figure card accent", () => {
    const { getByTestId } = render(
      <FigureCard accent data-testid="figure-card">
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
    const card = getByTestId("figure-card");
    expect(card).toHaveClass("card_figure_accent");
  });
  it("Figure card selected", () => {
    const { getByTestId } = render(
      <FigureCard selected data-testid="figure-card">
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
    const card = getByTestId("figure-card");
    expect(card).toHaveClass("card_figure_selected");
  });
  it("Figure card with onClick", () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <FigureCard accent data-testid="figure-card" onClick={onClick}>
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

    const card = getByTestId("figure-card");
    if (card) fireEvent.click(card);
    expect(onClick).toHaveBeenCalled();
  });
});
