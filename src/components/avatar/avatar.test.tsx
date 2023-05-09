import React from 'react';
import renderer from 'react-test-renderer';
import Avatar, {IAvatarProps} from './avatar';

const avatarTest = (props: IAvatarProps) => (
  <Avatar {...props}>
    <img className="avatar-test" src="https://www.w3schools.com/howto/img_avatar.png" alt="avatar-img" />
  </Avatar>
);

test('Avatar should render and match snapshot', () => {
  const component = renderer.create(avatarTest({badge: 8}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Avatar with no children', () => {
  const component = renderer.create(<Avatar badge={8} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Avatar big should render and match snapshot', () => {
  const component = renderer.create(avatarTest({big: true, badge: 8}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Avatar small should render and match snapshot', () => {
  const component = renderer.create(avatarTest({small: true, badge: 8}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Avatar xsmall should render and match snapshot', () => {
  const component = renderer.create(avatarTest({xsmall: true, badge: 8}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Avatar with title should render and match snapshot', () => {
  const component = renderer.create(avatarTest({badge: 8, title: 'Avatar'}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Avatar with title and subtitle should render and match snapshot', () => {
  const component = renderer.create(avatarTest({badge: 8, title: 'Avatar', subtitle: 'Avatar subtitle'}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Avatar with title and subtitle disabled should render and match snapshot', () => {
  const onClick = jest.fn();
  const component = renderer.create(
    avatarTest({badge: 8, title: 'Avatar', subtitle: 'Avatar subtitle', disabled: true, onClick: onClick})
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
