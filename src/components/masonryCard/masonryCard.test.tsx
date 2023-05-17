import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MasonryCard, { MasonryCardImg, MasonryCardTop, MasonryCardHeader, MasonryCardBody } from "./masonryCard";
import Image from "next/image";

/**
 * MASONRY CARD
 */
describe("Masonry card snapshots", () => {
  it("Masonry card", () => {
    const { container } = render(
      <MasonryCard>
        <MasonryCardImg>
          <img src="https://i.pinimg.com/736x/ee/be/fb/eebefb37815a1346e8cb4f3db608e1b1.jpg" alt="img-background" />
        </MasonryCardImg>

        <MasonryCardTop>
          <div className="status-tag_success">semantic</div>
          <button className="button-card-icon">
            <span className="material-icons">more_vert</span>
          </button>
          <button className="button-card-icon">
            <span className="material-icons">favorite_border</span>
          </button>
        </MasonryCardTop>
        <MasonryCardHeader>
          <h4>This is a title</h4>
        </MasonryCardHeader>
        <MasonryCardBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ea voluptates, facilis dolore dignissimos eum accusamus vitae accusantium dolores veritatis maiores deserunt unde natus
          similique omnis sit quaerat! At, asperiores.
        </MasonryCardBody>
      </MasonryCard>
    );

    expect(container).toMatchSnapshot();
  });

  it("Masonry card horizontal", () => {
    const { container } = render(
      <MasonryCard horizontal>
        <MasonryCardImg>
          <img src="https://i.pinimg.com/736x/ee/be/fb/eebefb37815a1346e8cb4f3db608e1b1.jpg" alt="img-background" />
        </MasonryCardImg>

        <MasonryCardTop>
          <div className="status-tag_success">semantic</div>
          <button className="button-card-icon">
            <span className="material-icons">more_vert</span>
          </button>
          <button className="button-card-icon">
            <span className="material-icons">favorite_border</span>
          </button>
        </MasonryCardTop>
        <MasonryCardHeader>
          <h4>This is a title</h4>
        </MasonryCardHeader>
        <MasonryCardBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ea voluptates, facilis dolore dignissimos eum accusamus vitae accusantium dolores veritatis maiores deserunt unde natus
          similique omnis sit quaerat! At, asperiores.
        </MasonryCardBody>
      </MasonryCard>
    );

    expect(container).toMatchSnapshot();
  });
});

describe("Masonry card funcionality", () => {
  it("Masonry card selected", () => {
    const { getByTestId } = render(
      <MasonryCard selected data-testid="masonry">
        <MasonryCardTop>
          <div className="status-tag_success">semantic</div>
          <button className="button-card-icon">
            <span className="material-icons">more_vert</span>
          </button>
          <button className="button-card-icon">
            <span className="material-icons">favorite_border</span>
          </button>
        </MasonryCardTop>
        <MasonryCardHeader>
          <h4>This is a title</h4>
        </MasonryCardHeader>
        <MasonryCardBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ea voluptates, facilis dolore dignissimos eum accusamus vitae accusantium dolores veritatis maiores deserunt unde natus
          similique omnis sit quaerat! At, asperiores.
        </MasonryCardBody>
      </MasonryCard>
    );
    const card = getByTestId("masonry");
    expect(card).toHaveClass("card_masonry_selected");
  });
  it("Masonry card accent", () => {
    const { getByTestId } = render(
      <MasonryCard horizontal>
        <MasonryCardTop>
          <div className="status-tag_success">semantic</div>
          <button className="button-card-icon">
            <span className="material-icons">more_vert</span>
          </button>
          <button className="button-card-icon">
            <span className="material-icons">favorite_border</span>
          </button>
        </MasonryCardTop>
        <MasonryCardHeader>
          <h4>This is a title</h4>
        </MasonryCardHeader>
        <MasonryCardBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ea voluptates, facilis dolore dignissimos eum accusamus vitae accusantium dolores veritatis maiores deserunt unde natus
          similique omnis sit quaerat! At, asperiores.
        </MasonryCardBody>
      </MasonryCard>
    );
    const cardImg = getByTestId("masonry-card-img");
    expect(cardImg).toHaveClass("bgAccent");
  });
});
