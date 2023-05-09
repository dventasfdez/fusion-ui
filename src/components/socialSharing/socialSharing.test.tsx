import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react';
import SocialSharing from './socialSharing';

const socialSharingExample = () => (
  <div className="tag-ds">
    <SocialSharing title="Copy link" />
  </div>
);

test('Social sharing module should render', () => {
  const component = renderer.create(socialSharingExample());
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Display social media icon', () => {
  const {container} = render(socialSharingExample());

  const socialMediaItem = container.getElementsByClassName('social-sharing-icon linkedin')[0];
  expect(socialMediaItem).toBeInTheDocument();
});

test('Display sharing link', () => {
  const {getByText} = render(socialSharingExample());

  const sharingLink = getByText('Copy link');
  expect(sharingLink).toBeInTheDocument();
});
