import React from 'react';
import renderer from 'react-test-renderer';
import {fireEvent, render} from '@testing-library/react';
import Sidebar, {ISidebarProps, SidebarButton, SidebarDivider, SidebarLogo} from './sidebar';

const sidebarExample = (props?: ISidebarProps | any) => (
  <Sidebar data-testid="sidebar" {...props} className=.stepone-ui">
    <SidebarLogo data-testid="sidebar-logo">
      <img
        src="https://www-prd-amz930-com.azureedge.net/es-es/-/media/project/adeccogroup/horizontal-the-adecco-group-brand-mark-land-rgb.png?h=475&w=1385&modified=00010101000000&hash=950A28C29AD61BBB9CB374DA671A06D1"
        alt="logo"
      />
    </SidebarLogo>
    <SidebarButton
      disabled={props?.buttonDisabled ? props.buttonDisabled : false}
      dropdown={props?.dropdown ? props.dropdown : false}
      onClick={props?.onClickButton ? props.onClickButton : null}
      data-testid="sidebar-button-1"
      id="button1"
      icon={<span className="material-icons">home</span>}
      label="Home"
      href="#1"
    />
    <SidebarButton
      data-testid="sidebar-button-2"
      id="button2"
      icon={<span className="material-icons">home</span>}
      label="Home"
      href="#2"
    />
    <SidebarButton
      data-testid="sidebar-button-3"
      id="button3"
      icon={<span className="material-icons">home</span>}
      label="Home"
      href="#3"
    />
    <SidebarButton
      data-testid="sidebar-button-4"
      id="button4"
      disabled
      icon={<span className="material-icons">home</span>}
      label="Home"
      href="#4"
    />
    <SidebarDivider data-testid="sidebar-divider">divider text</SidebarDivider>
    <SidebarButton
      data-testid="sidebar-button-5"
      id="button5"
      icon={<span className="material-icons">home</span>}
      label="Home"
      href="#5"
    />
    <SidebarButton
      data-testid="sidebar-button-6"
      id="button6"
      icon={<span className="material-icons">home</span>}
      label="Home"
      href="#6"
    />
    <SidebarButton
      data-testid="sidebar-button-7"
      id="button7"
      icon={<span className="material-icons">home</span>}
      label="Home"
      href="#7"
    />
    <SidebarButton
      data-testid="sidebar-button-8"
      id="button8"
      icon={<span className="material-icons">home</span>}
      label="Home"
      href="#8"
    />
    <SidebarButton
      data-testid="sidebar-button-9"
      id="button9"
      icon={<span className="material-icons">home</span>}
      label="Home"
      href="#12"
    />
    <SidebarButton
      data-testid="sidebar-button-10"
      id="button10"
      icon={<span className="material-icons">home</span>}
      label="Home"
      href="#123"
    />
    <SidebarButton
      data-testid="sidebar-button-11"
      id="button11"
      icon={<span className="material-icons">home</span>}
      label="Home"
      href="#145"
    />
  </Sidebar>
);

it('Sidebar should render', () => {
  const component = renderer.create(sidebarExample());
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('Sidebar collapsed should render', () => {
  const component = renderer.create(sidebarExample());
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('Sidebar default item should render', () => {
  const component = renderer.create(sidebarExample({defaultShow: true}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('Click in sidebar item ', () => {
  const {getByTestId} = render(sidebarExample());

  const itemBtn = getByTestId('sidebar-button-2');

  if (itemBtn) {
    fireEvent.click(itemBtn);
    expect(itemBtn.className.trim()).toBe('sidebar-button_selected');
  }
});

it('Click in collapsed btn ', () => {
  const {container, getByTestId} = render(sidebarExample());

  const itemBtn = getByTestId('sidebar-collapsed-btn');
  expect(container.getElementsByClassName('sidebar').length).toBe(1);
  if (itemBtn) {
    fireEvent.click(itemBtn);
  }
  expect(container.getElementsByClassName('sidebar_collapsed').length).toBe(1);
});

it('Custom onClick', () => {
  const onClick = jest.fn();
  const {getByTestId} = render(sidebarExample({onClick}));

  const itemBtn = getByTestId('sidebar-button-2');

  if (itemBtn) {
    fireEvent.click(itemBtn);
    expect(onClick).toHaveBeenCalled();
  }
});

it('Wrong custom onClick', () => {
  const onClick = jest.fn();
  const {getByTestId} = render(sidebarExample({onClickButton: onClick}));

  const itemBtn = getByTestId('sidebar-button-1');

  if (itemBtn) {
    fireEvent.click(itemBtn);
    expect(onClick).toHaveBeenCalled();
  }
});

it('Sidebar with dropdown', () => {
  const component = renderer.create(sidebarExample({dropdown: true}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('Sidebar with selected dropdown and disabled', () => {
  const component = renderer.create(sidebarExample({dropdown: true, buttonDisabled: true, defaultItemSelected: 'button1'}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('Render empty sidebar', () => {
  const component = renderer.create(<Sidebar />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('Render Sidebar with unique child', () => {
  const component = renderer.create(
    <Sidebar>
      <div>
        <img
          src="https://www-prd-amz930-com.azureedge.net/es-es/-/media/project/adeccogroup/horizontal-the-adecco-group-brand-mark-land-rgb.png?h=475&w=1385&modified=00010101000000&hash=950A28C29AD61BBB9CB374DA671A06D1"
          alt="logo"
        />
      </div>
    </Sidebar>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('Render sidebar with onClickSidebarItem and click in item', () => {
  const onClickSidebarItem = jest.fn();
  const {getByTestId} = render(sidebarExample({onClickSidebarItem}));

  const itemBtn = getByTestId('sidebar-button-2');

  if (itemBtn) {
    fireEvent.click(itemBtn);
    expect(onClickSidebarItem).toHaveBeenCalled();
  }
});

it('Render Sidebar and rerender with new props', () => {
  const {rerender, getByTestId} = render(sidebarExample({defaultItemSelected: 'button1'}));
  const itemBtn = getByTestId('sidebar-button-1');
  expect(itemBtn.className.trim()).toBe('sidebar-button_selected');
  rerender(sidebarExample({defaultItemSelected: 'button2'}));
  const itemBtn2 = getByTestId('sidebar-button-2');
  expect(itemBtn2.className.trim()).toBe('sidebar-button_selected');
});

it('Render SIdebar and handle collapse with custom onCollapse', () => {
  const onCollapse = jest.fn();
  const {getByTestId} = render(sidebarExample({defaultShow: true, onCollapse}));
  const itemBtn = getByTestId('sidebar-collapsed-btn');
  expect(itemBtn.className.trim()).toBe('sidebar-collapsed-button');
  fireEvent.click(itemBtn);
  expect(itemBtn.className.trim()).toBe('sidebar-collapsed-button');
});

it('render with wrong components', () => {
  const {getByTestId} = render(
    <Sidebar data-testid="sidebar">
      <div>Wrong 1</div>
      <div>
        <div>Wrong with child 1</div>
      </div>
    </Sidebar>
  );
  const itemBtn = getByTestId('sidebar');
  expect(itemBtn.className.trim()).toBe('sidebar');
});
