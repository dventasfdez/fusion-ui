import React from 'react';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import Breadcrumb, {IBreadcrumbProps, BreadcrumbItem} from './breadcrumb';

const BreadcrumbExample = (props?: IBreadcrumbProps) => {
  return (
    <Breadcrumb {...props} className="tag-ds breadcrumb-wrapper" data-testid="breadcrumb-test">
      <BreadcrumbItem href="Breadcrumb_1" data-testid="breadcrumb-1" id="breadcrumb-1" title="Breadcrumb Test 1" />
      <BreadcrumbItem href="Breadcrumb_2" data-testid="breadcrumb-2" id="breadcrumb-2" title="Breadcrumb Test 2" />
      <BreadcrumbItem href="Breadcrumb_3" data-testid="breadcrumb-3" id="breadcrumb-3" title="Breadcrumb Test 3" />
      <BreadcrumbItem
        href="Breadcrumb_4"
        data-testid="breadcrumb-4"
        id="breadcrumb-4"
        title="Breadcrumb title with more than 30 characters"
      />
    </Breadcrumb>
  );
};
const BreadcrumbExampleWithoutClassName = (props?: IBreadcrumbProps) => {
  return (
    <Breadcrumb {...props} data-testid="breadcrumb-test">
      <BreadcrumbItem href="Breadcrumb_1" data-testid="breadcrumb-1" id="breadcrumb-1" title="Breadcrumb Test 1" />
      <BreadcrumbItem href="Breadcrumb_2" data-testid="breadcrumb-2" id="breadcrumb-2" title="Breadcrumb Test 2" />
      <BreadcrumbItem href="Breadcrumb_3" data-testid="breadcrumb-3" id="breadcrumb-3" title="Breadcrumb Test 3" />
      <BreadcrumbItem
        href="Breadcrumb_4"
        data-testid="breadcrumb-4"
        id="breadcrumb-4"
        title="Breadcrumb title with more than 30 characters"
      />
    </Breadcrumb>
  );
};
const BreadcrumbExampleWithoutTestIds = (props?: IBreadcrumbProps) => {
  return (
    <Breadcrumb {...props} className="tag-ds breadcrumb-wrapper">
      <BreadcrumbItem href="Breadcrumb_1" id="breadcrumb-1" title="Breadcrumb Test 1" />
      <BreadcrumbItem href="Breadcrumb_2" id="breadcrumb-2" title="Breadcrumb Test 2" />
      <BreadcrumbItem href="Breadcrumb_3" id="breadcrumb-3" title="Breadcrumb Test 3" />
      <BreadcrumbItem href="Breadcrumb_4" id="breadcrumb-4" title="Breadcrumb title with more than 30 characters" />
      <BreadcrumbItem href="Breadcrumb_4" id="breadcrumb-5" title="Breadcrumb title with more than 30 characters" />
    </Breadcrumb>
  );
};
const BreadcrumbWithDropdownExample = (props?: IBreadcrumbProps) => {
  return (
    <Breadcrumb {...props} className="tag-ds breadcrumb-wrapper" data-testid="breadcrumb-test">
      <BreadcrumbItem href="Breadcrumb_1" data-testid="breadcrumb-1" id="breadcrumb-1" title="Breadcrumb Test 1" />
      <BreadcrumbItem href="Breadcrumb_2" data-testid="breadcrumb-2" id="breadcrumb-2" title="Breadcrumb Test 2" />
      <BreadcrumbItem href="Breadcrumb_3" data-testid="breadcrumb-3" id="breadcrumb-3" title="Breadcrumb Test 3" />
      <BreadcrumbItem href="Breadcrumb_4" data-testid="breadcrumb-4" id="breadcrumb-4" title="Breadcrumb Test 4" />
      <BreadcrumbItem
        href="Breadcrumb_5"
        data-testid="breadcrumb-truncated"
        id="breadcrumb-5"
        title="Breadcrumb title with more than 30 characters"
      />
    </Breadcrumb>
  );
};
const BreadcrumbWithUniqueChildExample = (props?: IBreadcrumbProps) => {
  return (
    <Breadcrumb {...props} className="tag-ds breadcrumb-wrapper" data-testid="breadcrumb-test">
      <BreadcrumbItem href="Breadcrumb_1" data-testid="breadcrumb-1" id="breadcrumb-1" title="Breadcrumb Test 1" />
    </Breadcrumb>
  );
};

test('render Breadcrumb and match snap', () => {
  const component = renderer.create(<BreadcrumbExample />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('Breadcrumb with no children', () => {
  const component = renderer.create(<Breadcrumb />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('Breadcrumb with one child', () => {
  const component = renderer.create(
    <Breadcrumb>
      <BreadcrumbItem id="1" title="Title" href="#" />
    </Breadcrumb>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Breadcrumb with one wrong child', () => {
  const component = renderer.create(
    <Breadcrumb>
      <div id="1" title="Title" />
    </Breadcrumb>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('render Breadcrumb without class name and match snap', () => {
  const component = renderer.create(<BreadcrumbExampleWithoutClassName />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('render Breadcrumb without data-testid and match snap', () => {
  const component = renderer.create(<BreadcrumbExampleWithoutTestIds />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('render Breadcrumb unique child and match snap', () => {
  const component = renderer.create(<BreadcrumbWithUniqueChildExample />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
test('render Breadcrumb with dropdown and match snap', () => {
  const component = renderer.create(<BreadcrumbWithDropdownExample />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

test('display a dropdown menu when there is more than 4 items', () => {
  const {getByTestId} = render(<BreadcrumbWithDropdownExample id="breadcrumb-test" />);
  const dropdown = getByTestId('breadcrumb-test-dropdown');
  expect(dropdown).toBeDefined();
});

test('display breadcrumb text truncated when it has more than 30 characters', () => {
  const {getByTestId} = render(<BreadcrumbExample />);
  const breadcrumbToTruncate = getByTestId('breadcrumb-4');

  expect(breadcrumbToTruncate).toHaveTextContent('Breadcrumb title with more tha...');
});
