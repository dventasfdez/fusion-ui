import React from 'react';
import renderer from 'react-test-renderer';
import {fireEvent, render} from '@testing-library/react';

import LocationMapCard, {
  LocationMapCardBody,
  LocationMapCardHeader,
  LocationMapCardMap,
  LocationMapCardTop,
} from './locationMapCard';

const locationMapCardExample = ({hoverButton, ...props}: any) => (
  <LocationMapCard {...props}>
    <LocationMapCardMap
      data-testid="location-map"
      hoverButton={
        hoverButton ? (
          <button data-testid="location-map-hover-btn">
            <span className="material-icons">search</span>View more
          </button>
        ) : undefined
      }
    >
      <img
        // eslint-disable-next-line max-len
        src="https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2016/05/543113-asi-funciona-google-maps-conexion-internet.jpg"
        alt="img-top"
      />
    </LocationMapCardMap>
    <LocationMapCardTop>
      <div className="status-tag_success">semantic</div>
    </LocationMapCardTop>
    <LocationMapCardHeader>
      <h4>Location, location city</h4>
      <button className="button-card-icon">
        <span className="material-icons">edit</span>
      </button>
    </LocationMapCardHeader>
    <LocationMapCardBody>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, voluptate!</LocationMapCardBody>
  </LocationMapCard>
);

/**
 * LOCATION MAP CARD
 */
describe('Location map card type tests', () => {
  test('Location map card component should render', () => {
    const component = renderer.create(locationMapCardExample({className: 'tag-ds'}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Location map card component should render', () => {
    const component = renderer.create(locationMapCardExample({className: 'tag-ds', selected: true, onClick: jest.fn()}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Display button on hover card image', () => {
    const {getByTestId} = render(locationMapCardExample({hoverButton: true}));
    const mapImage = getByTestId('location-map');
    if (mapImage) fireEvent.mouseOver(mapImage);
    const viewMoreButton = getByTestId('location-map-hover-btn');
    expect(viewMoreButton).toBeDefined();
  });
});
