import React from 'react';
import Dropdown from './dropdown';
import DropdownButton from './dropdownButton';
import DropdownMenu from './dropdownMenu';
import renderer from 'react-test-renderer';
import {fireEvent, render} from '@testing-library/react';

const dropdownExample = ({notButton, ...props}: any) => {
  return (
    <Dropdown {...props}>
      {!notButton && (
        <DropdownButton data-testid="dropdown-btn" className="button">
          Menu dropdown
        </DropdownButton>
      )}
      <DropdownMenu>
        <ul>
          <li className="dropdown-item">
            <a href="#dropdown">Item 1</a>
          </li>
          <li className="dropdown-item">
            <a href="#dropdown">Item 2</a>
          </li>
          <li className="dropdown-item">
            <a href="#dropdown">Item 3</a>
          </li>
          <li className="dropdown-item">
            <a href="#dropdown">Item 4</a>
          </li>
        </ul>
      </DropdownMenu>
    </Dropdown>
  );
};
const dropdownWithOtherDivExample = () => {
  return (
    <div style={{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column'}}>
      <div data-testid="other-div">Other div</div>
      <Dropdown style={{marginTop: 'auto'}}>
        <DropdownButton data-testid="dropdown-btn" className="button">
          Menu dropdown
        </DropdownButton>
        <DropdownMenu>
          <ul>
            <li className="dropdown-item">
              <a href="#dropdown">Item 1</a>
            </li>
            <li className="dropdown-item">
              <a href="#dropdown">Item 2</a>
            </li>
            <li className="dropdown-item">
              <a href="#dropdown">Item 3</a>
            </li>
            <li className="dropdown-item">
              <a href="#dropdown">Item 4</a>
            </li>
          </ul>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

test('Dropdown should render', () => {
  const component = renderer.create(dropdownExample({className: 'tag-ds'}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Dropdown without button should render', () => {
  const component = renderer.create(dropdownExample({className: 'tag-ds', notButton: true}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Click action toggle menu component', () => {
  const {container, getByTestId} = render(dropdownExample({className: 'tag-ds', notButton: false}));

  expect(container.getElementsByClassName('dropdown-menu')[0].classList).toContain('hidden');

  const dropdownBtn = getByTestId('dropdown-btn');
  if (dropdownBtn) fireEvent.click(dropdownBtn);
  expect(container.getElementsByClassName('dropdown-menu')[0].classList).not.toContain('hidden');
});

test('Click action toggle menu component and click outside', () => {
  const {container, getByTestId} = render(dropdownWithOtherDivExample());

  expect(container.getElementsByClassName('dropdown-menu')[0].classList).toContain('hidden');

  const dropdownBtn = getByTestId('dropdown-btn');
  if (dropdownBtn) fireEvent.click(dropdownBtn);
  expect(container.getElementsByClassName('dropdown-menu')[0].classList).not.toContain('hidden');

  const otherDiv = getByTestId('other-div');
  if (otherDiv) fireEvent.click(otherDiv);

  expect(container.getElementsByClassName('dropdown-menu')[0].classList).toContain('hidden');
});

test('Dropdown should render 4 dropdown items', () => {
  const {container, getByTestId} = render(dropdownExample({className: 'tag-ds'}));

  expect(container.getElementsByClassName('dropdown-menu')[0].classList).toContain('hidden');

  const dropdownBtn = getByTestId('dropdown-btn');
  if (dropdownBtn) fireEvent.click(dropdownBtn);
  expect(container.getElementsByClassName('dropdown-menu')[0].classList).not.toContain('hidden');

  expect(container.querySelectorAll('.dropdown-item').length).toBe(4);
});
