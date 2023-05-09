import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import {act} from 'react-dom/test-utils';
import Loader, {ILoaderProps} from './loader';

const LoaderExample = (props: ILoaderProps) => <Loader className="tag-ds" data-testid="loader-test" {...props} />;
const LoaderExampleWithOutTestIdAndClassName = (props: ILoaderProps) => <Loader {...props} />;

test('render Loader and match snap', () => {
  const component = renderer.create(<LoaderExample />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('render Loader spinner and match snap', () => {
  const component = renderer.create(<LoaderExample spinner />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('render Loader spinner with title and subtitle and match snap', () => {
  const component = renderer.create(<LoaderExample spinner title="Title" subtitle="Subtitle" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('render Loader circular and match snap', () => {
  const component = renderer.create(<LoaderExample />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('render Loader oval and match snap', () => {
  const component = renderer.create(<LoaderExample percentage={{value: 50, show: true}} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('render Loader and match snap without spinners', () => {
  const component = renderer.create(<LoaderExampleWithOutTestIdAndClassName title="title" subtitle="subtitle" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('render Loader spinner and match snap without spinners', () => {
  const component = renderer.create(<LoaderExampleWithOutTestIdAndClassName spinner />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('render Loader spinner and match snap without spinners', () => {
  const component = renderer.create(<LoaderExampleWithOutTestIdAndClassName spinner title="Title" subtitle="Subtitle" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('render Loader circular and match snap without spinners', () => {
  const component = renderer.create(<LoaderExampleWithOutTestIdAndClassName />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('render Loader oval and match snap without spinners', () => {
  const component = renderer.create(<LoaderExampleWithOutTestIdAndClassName percentage={{value: 50, show: true}} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('loader small', () => {
  const {getByTestId} = render(<LoaderExample percentage={{value: 50, show: false}} />);
  const loader = getByTestId('loader-test-svg-container');
  expect(loader).toHaveClass('svg-container_circular');
});

test('render loader automatically', () => {
  jest.useFakeTimers();
  const {getByTestId} = render(
    <LoaderExample title="Test Title" subtitle="Test subtitle" automatic percentage={{show: true}} />
  );
  const loader = getByTestId('loader-test-svg-container');

  act(() => {
    jest.advanceTimersByTime(6000);
  });

  expect(loader).toHaveAttribute('data-percentage', '100%');
}, 7000);

test('render title and subtitle', () => {
  const {getByTestId} = render(<LoaderExample title="Test Title" subtitle="Test subtitle" />);

  const title = getByTestId('loader-test-title');
  const subtitle = getByTestId('loader-test-subtitle');
  expect(title).toHaveTextContent('Test Title');
  expect(subtitle).toHaveTextContent('Test subtitle');
});

test('render title and subtitle in spinner', () => {
  const {getByTestId} = render(<LoaderExample spinner title="Test Title" subtitle="Test subtitle" />);

  const title = getByTestId('loader-test-title');
  const subtitle = getByTestId('loader-test-subtitle');
  expect(title).toHaveTextContent('Test Title');
  expect(subtitle).toHaveTextContent('Test subtitle');
});

describe('finish loading both cases', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  test('success case', async () => {
    const {getByTestId} = render(<LoaderExample title="Test Title" subtitle="Test subtitle" success automatic />);
    const loader = getByTestId('loader-test-svg-container');
    act(() => {
      jest.advanceTimersByTime(6000);
    });

    expect(loader).toHaveClass('success');
  }, 10000);

  test('success case with percentages', async () => {
    const {getByTestId} = render(
      <LoaderExample title="Test Title" subtitle="Test subtitle" success automatic percentage={{show: true}} />
    );
    const loader = getByTestId('loader-test-svg-container');
    act(() => {
      jest.advanceTimersByTime(6000);
    });

    expect(loader).toHaveClass('success');
  }, 10000);

  test('error case', async () => {
    const {getByTestId} = render(<LoaderExample title="Test Title" error subtitle="Test subtitle" automatic />);
    const loader = getByTestId('loader-test-svg-container');

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    expect(loader).toHaveClass('error');
  }, 7000);

  test('error case with percentages', async () => {
    const {getByTestId} = render(
      <LoaderExample title="Test Title" error subtitle="Test subtitle" automatic percentage={{show: true}} />
    );
    const loader = getByTestId('loader-test-svg-container');

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    expect(loader).toHaveClass('error');
  }, 7000);
});

test('render spinner', () => {
  const {getByTestId} = render(<LoaderExample spinner />);
  const loader = getByTestId('loader-test-spinner');
  expect(loader).toHaveClass('spinner');
});
