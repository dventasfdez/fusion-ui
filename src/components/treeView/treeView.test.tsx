import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import {Tree, TreeViewElement} from './treeView';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const TreeViewTest = (args: any) => {
  return (
    <div className="tag-ds">
      <Tree>
        <TreeViewElement data-testid="tree-element-1" name="Item Tree"></TreeViewElement>
        <TreeViewElement name="Item Tree"></TreeViewElement>
        {args.icon && <TreeViewElement data-testid="tree-element-5" name="Item Tree" icon={args.icon}></TreeViewElement>}
        <TreeViewElement data-testid="tree-element-2" name="Item Tree">
          <TreeViewElement data-testid="tree-element-3" name="Sub item">
            <TreeViewElement data-testid="tree-element-4" onClick={args.onClick} name="Sub item 2" />
          </TreeViewElement>
        </TreeViewElement>
      </Tree>
    </div>
  );
};

const TreeViewTestNonRenderable = (args: any) => {
  return (
    <div className="tag-ds">
      <Tree>
        <li data-testid="tree-element-1">item tree</li>
      </Tree>
    </div>
  );
};

test('render treeView and match snapshot', () => {
  const component = renderer.create(<TreeViewTest />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('on click function Tree Element', () => {
  const fn = jest.fn();
  const {getByTestId} = render(<TreeViewTest onClick={fn} />);
  userEvent.click(getByTestId('tree-element-2'));
  userEvent.click(getByTestId('tree-element-3'));
  userEvent.click(getByTestId('tree-element-4'));
  expect(fn).toBeCalledTimes(1);
});

test('non renderable Tree Element', () => {
  const {queryByText} = render(<TreeViewTestNonRenderable />);
  const element = queryByText(/item tree/i);
  expect(element).toBeNull();
});

test('Tree Element with icon', () => {
  const {getByTestId} = render(<TreeViewTest icon="home" />);
  const element = getByTestId('tree-element-1');
  expect(element).toHaveClass('tree-element');
});
