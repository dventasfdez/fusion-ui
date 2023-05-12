import {render} from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import MasonryCard, {MasonryCardImg, MasonryCardTop, MasonryCardHeader, MasonryCardBody} from './masonryCard';

const masonryCardExample = ({notImage, ...props}: any) => (
  <MasonryCard {...props}>
    {!notImage && (
      <MasonryCardImg>
        <img src="https://i.pinimg.com/736x/ee/be/fb/eebefb37815a1346e8cb4f3db608e1b1.jpg" alt="img-background" />
      </MasonryCardImg>
    )}
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
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam ea voluptates, facilis dolore dignissimos eum accusamus
      vitae accusantium dolores veritatis maiores deserunt unde natus similique omnis sit quaerat! At, asperiores.
    </MasonryCardBody>
  </MasonryCard>
);

/**
 * MASONRY CARD
 */
describe('Masonry card type tests', () => {
  test('Masonry card component should render', () => {
    const component = renderer.create(masonryCardExample({className: .stepone-ui'}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Masonry card horizontal component should render', () => {
    const component = renderer.create(masonryCardExample({className: .stepone-ui', horizontal: true}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Masonry card selected component should render', () => {
    const component = renderer.create(masonryCardExample({className: .stepone-ui', selected: true}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Masonry card accent component should render', () => {
    const component = renderer.create(masonryCardExample({accent: true}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Masonry card accent without image component should render', () => {
    const component = renderer.create(masonryCardExample({accent: true, notImage: true}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Without children', () => {
    // @ts-expect-error no children
    const {getByTestId} = render(<MasonryCard data-testid="masonry-card" />);
    expect(getByTestId('masonry-card')).toBeTruthy();
  });

  test('Only MasonryCardImg', () => {
    const {getByTestId, rerender} = render(
      <MasonryCard data-testid="masonry-card">
        <MasonryCardImg>
          <img src="https://i.pinimg.com/736x/ee/be/fb/eebefb37815a1346e8cb4f3db608e1b1.jpg" alt="img-background" />
        </MasonryCardImg>
      </MasonryCard>
    );
    expect(getByTestId('masonry-card')).toBeTruthy();

    rerender(
      <MasonryCard data-testid="masonry-card">
        <div>Wrong component</div>
      </MasonryCard>
    );

    expect(getByTestId('masonry-card')).toBeTruthy();
  });
});
