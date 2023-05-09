import React from 'react';
import renderer from 'react-test-renderer';
import IconCard, {IconCardIcon, IconCardHeader, IconCardBody, IconCardFooter} from './iconCard';

const iconCardExample = (props?: any) => (
  <div>
    <IconCard {...props}>
      <IconCardIcon>
        <span className="material-icons">collections</span>
      </IconCardIcon>
      <IconCardHeader>
        <h4>This is a title</h4>
      </IconCardHeader>
      <IconCardBody>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, excepturi.</IconCardBody>
      <IconCardFooter>
        <a href="">link</a>
      </IconCardFooter>
    </IconCard>
  </div>
);

/**
 * ICON CARD
 */
describe('Icon card type tests', () => {
  test('Icon card component should render', () => {
    const component = renderer.create(iconCardExample({className: 'tag-ds'}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Icon card selected component should render', () => {
    const component = renderer.create(iconCardExample({selected: true}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
