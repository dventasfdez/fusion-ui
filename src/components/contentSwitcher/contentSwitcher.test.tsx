import {fireEvent, render} from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import ContentSwitcher, {IContentSwitcherProps, ContentSwitcherItem} from './contentSwitcher';

const contentSwitcherExample = (props?: IContentSwitcherProps) => {
  return (
    <ContentSwitcher {...props} className=.stepone-ui">
      <ContentSwitcherItem data-testid="item1" id="item1" title="Tab 1">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur saepe doloribus nisi quis consectetur numquam
          blanditiis accusamus dolor ipsam aspernatur aperiam aut accusantium, itaque quasi magni enim exercitationem
          repellat? Obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit.
        </p>
      </ContentSwitcherItem>
      <ContentSwitcherItem data-testid="item2" id="item2" title="Tab 2">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque accusantium fugiat eveniet dignissimos quas!
          Rem cupiditate corrupti, molestias dolores distinctio excepturi perspiciatis numquam placeat ipsa necessitatibus
          facilis nobis optio quisquam, veritatis incidunt officiis at dolore accusantium porro sit, eaque qui atque quas
          suscipit. Voluptatibus asperiores quia dicta ducimus distinctio?
        </p>
      </ContentSwitcherItem>
      <ContentSwitcherItem data-testid="item3" id="item3" title="Tab 3" icon={<span className="material-icons">fire</span>}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque accusantium fugiat eveniet dignissimos quas!
          Rem cupiditate corrupti, molestias dolores distinctio excepturi perspiciatis numquam placeat ipsa necessitatibus
          facilis nobis optio quisquam, veritatis incidunt officiis at dolore accusantium porro sit, eaque qui atque quas
          suscipit. Voluptatibus asperiores quia dicta ducimus distinctio? Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Minima, neque accusantium fugiat eveniet dignissimos quas!
        </p>
      </ContentSwitcherItem>
      <ContentSwitcherItem data-testid="item4" id="item4" title="Tab 4" badge={9}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, neque accusantium fugiat eveniet dignissimos quas!
          Rem cupiditate corrupti, molestias dolores distinctio excepturi perspiciatis numquam placeat ipsa necessitatibus
          facilis nobis optio quisquam, veritatis incidunt officiis at dolore accusantium porro sit, eaque qui atque quas
          suscipit. Voluptatibus asperiores quia dicta ducimus distinctio?
        </p>
      </ContentSwitcherItem>
    </ContentSwitcher>
  );
};

const contentSwitcherExampleWithUniqueChild = (props?: IContentSwitcherProps) => {
  return (
    <ContentSwitcher {...props}>
      <ContentSwitcherItem data-testid="tab1" id="tab1" title="Tab 1">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur saepe doloribus nisi quis consectetur numquam
          blanditiis accusamus dolor ipsam aspernatur aperiam aut accusantium, itaque quasi magni enim exercitationem
          repellat? Obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit.
        </p>
      </ContentSwitcherItem>
    </ContentSwitcher>
  );
};
const contentSwitcherExampleWithoutTestId = (props?: IContentSwitcherProps) => {
  return (
    <ContentSwitcher {...props}>
      <ContentSwitcherItem id="tab1" title="Tab 1">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur saepe doloribus nisi quis consectetur numquam
          blanditiis accusamus dolor ipsam aspernatur aperiam aut accusantium, itaque quasi magni enim exercitationem
          repellat? Obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet,
          consectetur adipisicing elit.
        </p>
      </ContentSwitcherItem>
    </ContentSwitcher>
  );
};

it('ContentSwitcher default', () => {
  const component = renderer.create(contentSwitcherExample());
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('ContentSwitcher small', () => {
  const component = renderer.create(contentSwitcherExample({small: true}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('ContentSwitcher with dividers', () => {
  const component = renderer.create(contentSwitcherExample({divider: true}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('ContentSwitcher small with dividers', () => {
  const component = renderer.create(contentSwitcherExample({small: true, divider: true}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('ContentSwitcher default with unique child', () => {
  const component = renderer.create(contentSwitcherExampleWithUniqueChild());
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('ContentSwitcher default without test ids', () => {
  const component = renderer.create(contentSwitcherExampleWithoutTestId());
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('ContentSwitcher with onChange', () => {
  const onChange = jest.fn();
  const {getByTestId} = render(contentSwitcherExample({onChangeItem: onChange}));

  const itemBtn1 = getByTestId('item1');

  if (itemBtn1) fireEvent.click(itemBtn1);

  expect(onChange).toHaveBeenCalled();
});

it('ContentSwitcher without children', () => {
  const component = renderer.create(<ContentSwitcher />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('ContentSwitcher with invalid children', () => {
  const component = renderer.create(
    <ContentSwitcher>
      <div>Invalid child</div>
    </ContentSwitcher>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('Select content switcher item 2 ', () => {
  const {getByTestId} = render(contentSwitcherExample({defaultActiveItem: 'item3'}));

  expect(getByTestId('item3-content')).toBeDefined();

  const itemBtn2 = getByTestId('item2');

  if (itemBtn2) fireEvent.click(itemBtn2);

  expect(getByTestId('item2-content')).toBeDefined();
});
