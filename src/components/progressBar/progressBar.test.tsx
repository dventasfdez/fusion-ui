import React from 'react';
import ProgressBar, {IProgressBarProps} from './progressBar';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {act} from 'react-dom/test-utils';

const progressBarTest = (args: IProgressBarProps) => {
  return <ProgressBar data-testid="progress-bar" {...args} />;
};
const progressBarTestWithoutTestId = (args: IProgressBarProps) => {
  return <ProgressBar {...args} />;
};

test('render and match snapshot', () => {
  const component = renderer.create(progressBarTest({title: 'Title', helper: 'Helper', steps: 3, step: 1}));
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('render with no steps', () => {
  const {container} = render(progressBarTest({title: 'Title', helper: 'Helper', steps: 0, step: 0}));
  expect(container.querySelector('progress-bar-steps')).toBeDefined();
});

test('render circle progress bar', () => {
  const {getByTestId} = render(progressBarTest({title: 'Title', helper: 'Helper', circular: true, steps: 3, step: 1}));
  const progress = getByTestId('progress-bar-svg-container');
  expect(progress).toHaveClass('svg-container_circular_big');
});

test('render small circle progress bar', () => {
  const {getByTestId} = render(progressBarTest({title: 'Title', helper: 'Helper', small: true, steps: 3, step: 1}));
  const progress = getByTestId('progress-bar-svg-container');
  expect(progress).toHaveClass('svg-container_circular_medium');
});

describe('render without title', () => {
  test('default', () => {
    const {container} = render(progressBarTest({helper: 'Helper', steps: 3, step: 1}));
    expect(container).not.toContain('Title');
  });
  test('circular', () => {
    const {container} = render(progressBarTest({helper: 'Helper', circular: true, steps: 3, step: 1}));
    expect(container).not.toContain('Title');
  });

  test('small', () => {
    const {container} = render(progressBarTest({helper: 'Helper', small: true, steps: 3, step: 1}));
    expect(container).not.toContain('Title');
  });
});

test('updates progress', () => {
  const {container} = render(progressBarTest({steps: 3, step: 1}));

  // update the props, re-render to the same container
  render(progressBarTest({step: 2, steps: 3, showPercentage: true}), {container});

  expect(container.querySelector('.progress-bar-percentage')).toHaveTextContent('67%');
});

test('updates progress round', () => {
  const {container} = render(progressBarTest({steps: 3, step: 1, circular: true}));

  // update the props, re-render to the same container
  render(progressBarTest({step: 2, steps: 3, showPercentage: true}), {container});

  expect(container.querySelector('.progress-bar-percentage')).toHaveTextContent('67%');
});

test('updates progress round', () => {
  const {container} = render(progressBarTest({steps: 3, step: 1, small: true}));

  // update the props, re-render to the same container
  render(progressBarTest({step: 2, steps: 3, showPercentage: true}), {container});

  expect(container.querySelector('.progress-bar-percentage')).toHaveTextContent('67%');
});

test('no testid', () => {
  const {container} = render(progressBarTestWithoutTestId({helper: 'Helper', small: true, steps: 3, step: 1}));
  expect(container).not.toContain('Title');
});

test('no testid in small mode', () => {
  const {container} = render(progressBarTestWithoutTestId({helper: 'Helper', steps: 3, step: 1, showSteps: true}));
  expect(container).not.toContain('Title');
});

test('no testid in circular mode', () => {
  const {container} = render(progressBarTestWithoutTestId({helper: 'Helper', circular: true, steps: 3, step: 1}));
  expect(container).not.toContain('Title');
});

test('circular mode no steps', () => {
  const {container} = render(progressBarTest({helper: 'Helper', circular: true, steps: 0, step: 0}));
  expect(container.querySelector('progress-bar-steps')).toBeDefined();
});

test('small mode no steps', () => {
  const {container} = render(progressBarTest({helper: 'Helper', small: true, steps: 0, step: 0}));
  expect(container.querySelector('progress-bar-steps')).toBeDefined();
});

test('circular mode change steps and step', () => {
  const {container, rerender} = render(
    <ProgressBar data-testid="progress-bar" helper="Helper" circular={true} steps={4} step={2} />
  );
  expect(container.querySelector('progress-bar-steps')).toBeDefined();
  rerender(<ProgressBar data-testid="progress-bar" helper="Helper" circular={true} steps={5} step={2} />);
  rerender(<ProgressBar data-testid="progress-bar" helper="Helper" circular={true} steps={5} step={3} />);
  expect(container.querySelector('progress-bar-steps')).toBeDefined();
});

test('circular mode change steps and step (no ref)', () => {
  // simulate existence of ref.current
  jest.spyOn(React, 'useRef').mockReturnValueOnce({current: null});
  const {container, rerender} = render(
    <ProgressBar data-testid="progress-bar" helper="Helper" circular={true} steps={4} step={2} />
  );
  expect(container.querySelector('progress-bar-steps')).toBeDefined();
  rerender(<ProgressBar data-testid="progress-bar" helper="Helper" circular={true} steps={5} step={2} />);
  rerender(<ProgressBar data-testid="progress-bar" helper="Helper" circular={true} steps={5} step={3} />);
  expect(container.querySelector('progress-bar-steps')).toBeDefined();
});
