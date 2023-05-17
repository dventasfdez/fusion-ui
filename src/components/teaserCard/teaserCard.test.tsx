import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TeaserCard, { TeaserCardImg, TeaserCardTop, TeaserCardHeader, TeaserCardBody, TeaserCardFooter } from "./teaserCard";

/**
 * TEASER CARD
 */
describe("Teaser card snapshots", () => {
  it("Teaser card component should render", () => {
    const { container } = render(
      <TeaserCard>
        <TeaserCardImg>
          <img src="https://img.freepik.com/fotos-premium/edificios-modernos-torre-o-rascacielos-distrito-financiero-nubes-dia-soleado-chicago-ee-uu_43552-32.jpg?w=2000" alt="img-top" />
        </TeaserCardImg>
        <TeaserCardTop>
          <div className="status-tag">Semantic</div>
          <span className="tag">{"06 SEP 2022"}</span>
        </TeaserCardTop>
        <TeaserCardHeader>
          <h4>This is a title</h4>
          <span className="subtitle">And this is a subtitle</span>
        </TeaserCardHeader>
        <TeaserCardBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, molestias ipsa quis, eum officia aliquid eaque cum illum voluptates nobis libero deserunt labore voluptas adipisci minima
          vero voluptatem veritatis. Rerum?
        </TeaserCardBody>
        <TeaserCardFooter>
          <button className="button_large">Join our newsletter</button>
        </TeaserCardFooter>
      </TeaserCard>
    );
    expect(container).toMatchSnapshot();
  });
});

describe("Teaser Card functionality", () => {
  it("Teaser card selected", () => {
    const { getByTestId } = render(
      <TeaserCard selected data-testid="teaser-card">
        <TeaserCardImg>
          <img src="https://img.freepik.com/fotos-premium/edificios-modernos-torre-o-rascacielos-distrito-financiero-nubes-dia-soleado-chicago-ee-uu_43552-32.jpg?w=2000" alt="img-top" />
        </TeaserCardImg>
        <TeaserCardTop>
          <div className="status-tag">Semantic</div>
          <span className="tag">{"06 SEP 2022"}</span>
        </TeaserCardTop>
        <TeaserCardHeader>
          <h4>This is a title</h4>
          <span className="subtitle">And this is a subtitle</span>
        </TeaserCardHeader>
        <TeaserCardBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, molestias ipsa quis, eum officia aliquid eaque cum illum voluptates nobis libero deserunt labore voluptas adipisci minima
          vero voluptatem veritatis. Rerum?
        </TeaserCardBody>
        <TeaserCardFooter>
          <button className="button_large">Join our newsletter</button>
        </TeaserCardFooter>
      </TeaserCard>
    );
    const card = getByTestId("teaser-card");
    expect(card).toHaveClass("card_teaser_selected");
  });
});
