import React from 'react';
import renderer from 'react-test-renderer';
import TeaserCard, {TeaserCardImg, TeaserCardTop, TeaserCardHeader, TeaserCardBody, TeaserCardFooter} from './teaserCard';

const teaserCardExample = (props?: any) => (
  <TeaserCard {...props}>
    <TeaserCardImg>
      <img
        // eslint-disable-next-line max-len
        src="https://img.freepik.com/fotos-premium/edificios-modernos-torre-o-rascacielos-distrito-financiero-nubes-dia-soleado-chicago-ee-uu_43552-32.jpg?w=2000"
        alt="img-top"
      />
    </TeaserCardImg>
    <TeaserCardTop>
      <div className="status-tag">Semantic</div>
      <span className="tag">{'06 SEP 2022'}</span>
    </TeaserCardTop>
    <TeaserCardHeader>
      <h4>This is a title</h4>
      <span className="subtitle">And this is a subtitle</span>
    </TeaserCardHeader>
    <TeaserCardBody>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, molestias ipsa quis, eum officia aliquid eaque cum
      illum voluptates nobis libero deserunt labore voluptas adipisci minima vero voluptatem veritatis. Rerum?
    </TeaserCardBody>
    <TeaserCardFooter>
      <button className="button_large">Join our newsletter</button>
    </TeaserCardFooter>
  </TeaserCard>
);

/**
 * TEASER CARD
 */
describe('Teaser card type tests', () => {
  test('Teaser card component should render', () => {
    const component = renderer.create(teaserCardExample({className: .stepone-ui'}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Teaser card selected component should render', () => {
    const component = renderer.create(teaserCardExample({selected: true}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
