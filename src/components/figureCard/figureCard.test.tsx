import React from 'react';
import renderer from 'react-test-renderer';

import FigureCard, {FigureCardBody, FigureCardFigure, FigureCardFloatIcon, FigureCardHeader} from './figureCard';

const figureCardExample = ({notIcon, notHeader, notBody, ...props}: any) => (
  <FigureCard {...props}>
    <FigureCardFigure>00</FigureCardFigure>

    <FigureCardFloatIcon className={!notHeader ? 'test-float-icon' : undefined}>
      {!notIcon && <span className={!notHeader ? 'material-icons' : undefined}>collections</span>}
    </FigureCardFloatIcon>

    {!notHeader && (
      <FigureCardHeader>
        <h4>This is a title</h4>
      </FigureCardHeader>
    )}
    {!notBody && <FigureCardBody>This is a Figure in horizontal disposition</FigureCardBody>}
  </FigureCard>
);

describe('Figure card type tests', () => {
  test('Figure card component should render', () => {
    const component = renderer.create(figureCardExample({className: 'tag-ds', id: 'figure-card-id'}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Figure card accent component should render', () => {
    const component = renderer.create(figureCardExample({accent: true}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Figure card selected component should render', () => {
    const component = renderer.create(figureCardExample({selected: true}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Figure card component without content childrens should render', () => {
    const component = renderer.create(figureCardExample({notHeader: true, notBody: true}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Figure card component without header childrens should render', () => {
    const component = renderer.create(figureCardExample({notHeader: true}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Figure card component without body childrens should render', () => {
    const component = renderer.create(figureCardExample({notBody: true}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Figure card component without icon children in float icon should render', () => {
    const component = renderer.create(figureCardExample({notIcon: true}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Figure card component without icon class name in float icon should render', () => {
    const component = renderer.create(figureCardExample({withoutClassName: true}));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
