import React from 'react';
import renderer from 'react-test-renderer';
import Badge from './badge';

test('Empty badge should render and match snapshot', () => {
  const component = renderer.create(<Badge />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Badge should render and match snapshot', () => {
  const component = renderer.create(<Badge>8</Badge>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Badge small should render and match snapshot', () => {
  const component = renderer.create(<Badge small>8</Badge>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Badge error should render and match snapshot', () => {
  const component = renderer.create(<Badge error>8</Badge>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Badge error small should render and match snapshot', () => {
  const component = renderer.create(
    <Badge error small>
      8
    </Badge>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Badge success should render and match snapshot', () => {
  const component = renderer.create(<Badge success>8</Badge>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Badge small should render and match snapshot', () => {
  const component = renderer.create(
    <Badge success small>
      8
    </Badge>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
