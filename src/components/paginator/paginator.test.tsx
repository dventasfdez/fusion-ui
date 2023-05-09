import React from 'react';
import Paginator, {IPaginator} from './paginator';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const paginatorTest = (args: IPaginator) => {
  return <Paginator {...args} data-testid="paginator" />;
};

const paginatorTestWithoutTestId = (args: IPaginator) => {
  return <Paginator {...args} />;
};

test('renders and match snapshot', () => {
  const component = renderer.create(paginatorTest({pages: 20}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders and match snapshot without test id', () => {
  const component = renderer.create(paginatorTestWithoutTestId({pages: 20}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Renders default paginator', () => {
  const {getByTestId} = render(paginatorTest({pages: 20}));
  const paginator = getByTestId('paginator');
  expect(paginator.querySelector('paginator')).toBeDefined();
});

test('renders collapsed paginator', () => {
  const {getByTestId} = render(paginatorTest({pages: 20, collapsed: true}));
  const paginator = getByTestId('paginator');
  expect(paginator.querySelector('paginator-collapsed')).toBeDefined();
});

test('incerment page default', () => {
  const {getByText, getByTestId} = render(paginatorTest({pages: 20}));
  const nextButton = getByTestId('paginator-button-next');
  expect(getByText(1)).toBeDefined();
  userEvent.click(nextButton);
  expect(getByText(6)).toBeDefined();
});

test('incerment page truncate', () => {
  const {getByText, getByTestId} = render(paginatorTest({pages: 20, truncate: 'right'}));
  const nextButton = getByTestId('paginator-button-next');
  expect(getByText(1)).toBeDefined();
  userEvent.click(nextButton);
  expect(getByText(6)).toBeDefined();
});

test('decrement page default', () => {
  const {getByText, getByTestId} = render(paginatorTest({pages: 20, defaultPage: 6}));
  const prevButton = getByTestId('paginator-button-previous');
  expect(getByText(7)).toBeDefined();
  userEvent.click(prevButton);
  expect(getByText(1)).toBeDefined();
});

test('decrement page truncated', () => {
  const {getByText, getByTestId} = render(paginatorTest({pages: 20, truncate: 'right'}));
  const nextButton = getByTestId('paginator-button-next');
  const prevButton = getByTestId('paginator-button-previous');
  userEvent.click(nextButton);
  expect(getByText(7)).toBeDefined();
  userEvent.click(prevButton);
  expect(getByText(1)).toBeDefined();
});

test('truncate to start (left)', () => {
  const {getByText, getByTestId} = render(paginatorTest({pages: 20, truncate: 'left'}));
  const nextChunckBtn = getByTestId('paginator-button-next');
  if (nextChunckBtn) fireEvent.click(nextChunckBtn);
  const trunc = getByTestId('paginator-truncate-left');
  userEvent.click(trunc);
  expect(getByText(1)).toHaveClass('paginator-page_active');
});

test('truncate to finish (right)', () => {
  const {getByText, getByTestId} = render(paginatorTest({pages: 20, truncate: 'right'}));
  const trunc = getByTestId('paginator-truncate-right');
  userEvent.click(trunc);
  expect(getByText(20)).toHaveClass('paginator-page_active');
});

test('number click', () => {
  const onChange = jest.fn();
  const {getByTestId} = render(paginatorTest({pages: 20, defaultPage: 3, onChangePage: onChange}));
  const buttonNum = getByTestId('paginator-button-num-1');
  userEvent.click(buttonNum);
  expect(onChange).toBeCalledWith(1);
});

test('jump option to start', () => {
  const {getByTestId, container} = render(
    paginatorTest({pages: 20, collapsed: true, defaultPage: 5, collapsedOptions: {jump: 'all'}})
  );
  const jump = getByTestId('paginator-button-jump-previous');

  userEvent.click(jump);
  expect(container.getElementsByClassName('input')[0]?.innerHTML).toBe('1');
});

test('jump option to finish', () => {
  const {getByTestId, container} = render(
    paginatorTest({pages: 20, collapsed: true, defaultPage: 5, collapsedOptions: {jump: 'all'}})
  );
  const jump = getByTestId('paginator-button-jump-next');

  userEvent.click(jump);
  expect(container.getElementsByClassName('input')[0]?.innerHTML).toBe('20');
});

test('collapsed arrow navigation left', () => {
  const {getByTestId, container} = render(
    paginatorTest({pages: 20, collapsed: true, defaultPage: 5, collapsedOptions: {jump: 'all'}})
  );
  const previous = getByTestId('paginator-button-previous');
  userEvent.click(previous);
  expect(container.getElementsByClassName('input')[0]?.innerHTML).toBe('4');
});

test('collapsed arrow navigation right', () => {
  const {getByTestId, container} = render(
    paginatorTest({pages: 20, collapsed: true, defaultPage: 5, collapsedOptions: {jump: 'all'}})
  );
  const next = getByTestId('paginator-button-next');
  userEvent.click(next);
  expect(container.getElementsByClassName('input')[0]?.innerHTML).toBe('6');
});

test('select page from dropdown collapsed', () => {
  const {getByTestId} = render(paginatorTest({pages: 20, collapsed: true, defaultPage: 5, collapsedOptions: {jump: 'all'}}));
  const dropdown = getByTestId('paginator-dropdown');
  if (dropdown) userEvent.click(dropdown);
  const DItem = screen.getByTestId('paginator-dropdown-item-4');
  userEvent.click(DItem);
  expect(dropdown.getElementsByClassName('input')[0]?.innerHTML).toBe('4');
});

test('minimum pages render', () => {
  const {queryByText} = render(paginatorTest({pages: 5}));
  expect(queryByText(/navigate_next/i)).toBeNull();
});

test('disabled paginator', () => {
  const {getByTestId} = render(paginatorTest({pages: 20, disabled: true}));
  const disabledNumber = getByTestId('paginator-button-next');
  expect(disabledNumber).toHaveAttribute('disabled');
});

test('Render paginator without data-testid', () => {
  const {container} = render(<Paginator pages={20} />);
  expect(container).toMatchSnapshot();
});

test('Render truncate right paginator active on last element', () => {
  const {container} = render(<Paginator pages={20} truncate="right" active={20} />);
  expect(container).toMatchSnapshot();
});

test('Render truncate right paginator active on last element with data-testid', () => {
  const {container} = render(<Paginator pages={20} truncate="right" active={20} data-testid="test" />);
  expect(container).toMatchSnapshot();
});

test('Render truncate right paginator active on last element', () => {
  const {getByTestId} = render(<Paginator pages={20} truncate="right" defaultPage={20} data-testid="paginator" />);
  const previousChunckBtn = getByTestId('paginator-button-previous');
  if (previousChunckBtn) fireEvent.click(previousChunckBtn);
  const firstElement = getByTestId('paginator-truncate-right');
  expect(firstElement).toHaveClass('paginator-page_active');
});

test('Render truncate left paginator active on last element', () => {
  const {getByTestId, rerender} = render(<Paginator pages={20} truncate="left" defaultPage={0} data-testid="paginator" />);
  const nextChunckBtn = getByTestId('paginator-button-next');
  if (nextChunckBtn) fireEvent.click(nextChunckBtn);
  const firstElement = getByTestId('paginator-truncate-left');
  expect(firstElement).toHaveClass('paginator-page_active');
  const element = getByTestId('paginator-button-num-6');
  if (element) fireEvent.click(element);
  expect(element).toHaveClass('paginator-page_active');
  rerender(<Paginator pages={20} truncate="left" defaultPage={6} />);
  expect(() => getByTestId('paginator-truncate-left')).toThrow();
});

test('Render truncate left paginator active on first element', () => {
  const {container} = render(<Paginator pages={20} truncate="left" defaultPage={5} />);
  expect(container).toMatchSnapshot();
});

test('Render truncate left paginator active on first element with data-testid', () => {
  const {container} = render(<Paginator pages={20} truncate="left" defaultPage={5} data-testid="test" />);
  expect(container).toMatchSnapshot();
});

test('Render collapsed paginator with active !== 0', () => {
  const {container} = render(<Paginator pages={20} collapsed defaultPage={5} />);
  expect(container).toMatchSnapshot();
});

test('Render collapsed paginator with active !== 0 with collapsedOptions', () => {
  const {container} = render(<Paginator pages={20} collapsed defaultPage={5} collapsedOptions={{jump: 'left'}} />);
  expect(container).toMatchSnapshot();
});

test('Render collapsed paginator with active !== 0 with collapsedOptions', () => {
  const {container} = render(<Paginator pages={20} collapsed defaultPage={5} collapsedOptions={{jump: 'right'}} />);
  expect(container).toMatchSnapshot();
});
