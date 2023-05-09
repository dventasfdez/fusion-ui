import React from 'react';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react';

import Button, {IButtonProps} from './button';

const buttonTest = (props: IButtonProps) => <Button {...props}>button test</Button>;

test('Button should render and match snapshot', () => {
  const component = renderer.create(buttonTest({primary: true}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button should render with primary class', () => {
  const component = renderer.create(buttonTest({primary: true, 'data-testid': 'button-primary'}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button should render with secondary class', () => {
  const component = renderer.create(buttonTest({secondary: true, 'data-testid': 'button-secondary'}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button should render with cta class', () => {
  const component = renderer.create(buttonTest({cta: true, 'data-testid': 'button-cta'}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button should render with small class', () => {
  const component = renderer.create(buttonTest({small: true, 'data-testid': 'button-cta'}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button should render with large class', () => {
  const component = renderer.create(buttonTest({large: true, 'data-testid': 'button-cta'}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button should render with fullWitdth class', () => {
  const component = renderer.create(buttonTest({fullWidth: true, 'data-testid': 'button-cta'}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button should render with left class when icon position is left', () => {
  const {container} = render(buttonTest({cta: true, icon: {value: 'home', position: 'left'}}));
  expect(container.getElementsByClassName('material-icons left').length).toBe(1);
});

test('Button should render with right class when icon position is right', () => {
  const {container} = render(buttonTest({cta: true, icon: {value: 'home', position: 'right'}}));
  expect(container.getElementsByClassName('material-icons right').length).toBe(1);
});
