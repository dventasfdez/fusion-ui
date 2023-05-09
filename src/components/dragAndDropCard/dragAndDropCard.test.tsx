import React from 'react';
import renderer from 'react-test-renderer';
import {fireEvent, render} from '@testing-library/react';
import DragAndDropCard, {DragAndDropCardHeader} from './dragAndDropCard';

const dragAndDropCardExample = (props?: any) => (
  <DragAndDropCard {...props}>
    <DragAndDropCardHeader>Drag and drop card</DragAndDropCardHeader>
  </DragAndDropCard>
);

/**
 * DRAG AND DROP CARD
 */
describe('Drag and drop card type tests', () => {
  test('Drag and drop card component should render', () => {
    const component = renderer.create(dragAndDropCardExample({className: 'tag-ds'}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Drag and drop card component placeholder type should render', () => {
    const component = renderer.create(dragAndDropCardExample({placeholder: true}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Drag and drop card component completed should render', () => {
    const component = renderer.create(dragAndDropCardExample({completed: true}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Display drag and drop card component with options', () => {
    const onClickItem = jest.fn();
    const {container, getByTestId} = render(
      dragAndDropCardExample({
        'data-testid': 'drag-drop-card',
        options: [{label: 'option 1'}, {label: 'option 2', onClick: onClickItem}],
      })
    );
    const menu = getByTestId('drag-drop-card-dropdown-btn');
    if (menu) fireEvent.click(menu);
    expect(container.getElementsByClassName('dropdown-item').length).toBe(2);
    const item2 = getByTestId('drag-drop-card-dropdown-item-1');
    if (item2) fireEvent.click(item2);
    expect(onClickItem).toBeCalled();
  });
  test('Display drag and drop card component with options without data-testid', () => {
    const onClickItem = jest.fn();
    const {container} = render(
      dragAndDropCardExample({
        options: [{label: 'option 1'}, {label: 'option 2', onClick: onClickItem}],
      })
    );
    expect(container.getElementsByClassName('dropdown-item').length).toBe(2);
  });
});
