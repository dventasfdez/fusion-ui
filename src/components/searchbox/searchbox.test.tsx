import React from 'react';

import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import Searchbox, {ISearchboxProps} from './searchbox';
import userEvent from '@testing-library/user-event';

const SearchboxTest = (props: ISearchboxProps) => {
  return <Searchbox {...props} />;
};

test('renders and match snapshot searchbox', () => {
  const onChange = jest.fn();
  const component = renderer.create(<SearchboxTest onChange={onChange} value={''} data-testid="searchbox-test" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders and match snapshot small searchbox', () => {
  const onChange = jest.fn();
  const component = renderer.create(<SearchboxTest small onChange={onChange} value={''} data-testid="searchbox-test" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders and match snapshot searchbox withput data-testid', () => {
  const onChange = jest.fn();
  const component = renderer.create(<SearchboxTest onChange={onChange} value={'Value'} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('render and change value', () => {
  const onChange = jest.fn();
  const {container} = render(<SearchboxTest onChange={onChange} />);
  const input = container.querySelector('input') as HTMLInputElement;
  userEvent.type(input, 'test');
  expect(input.value).toBe('test');
  userEvent.clear(input);
  expect(input.value).toBe('');
});

test('render with default Value', async () => {
  const onChange = jest.fn();
  const {container} = render(<SearchboxTest onChange={onChange} defaultValue="value" />);
  const input = container.querySelector('input') as HTMLInputElement;
  expect(input.defaultValue).toBe('value');
});

test('render remove button', () => {
  const onChange = jest.fn();
  const {getByTestId} = render(<SearchboxTest onChange={onChange} value={'Value'} data-testid="searchbox-test" />);
  const removeBtn = getByTestId('searchbox-test-remove-btn');

  expect(removeBtn).toBeDefined();
});
