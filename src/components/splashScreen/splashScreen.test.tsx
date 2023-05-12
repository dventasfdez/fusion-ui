import React from 'react';
import SplashScreen from './splashScreen';
import '@testing-library/jest-dom/extend-expect';
import renderer, {act} from 'react-test-renderer';
import {fireEvent, render} from '@testing-library/react';

const backgroundImageURI = 'https://www.w3schools.com/html/img_girl.jpg';
const backgroundVideoURI =
  'https://assets.mixkit.co/videos/preview/mixkit-clouds-in-the-sky-flowing-with-the-wind-21584-large.mp4';

const SplashScreenTest = (props?: any) => {
  return (
    <SplashScreen
      {...props}
      logo="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Adecco_logo.svg/800px-Adecco_logo.svg.png"
    />
  );
};
const SplashScreenTestLogoObject = (props?: any) => {
  return (
    <SplashScreen
      {...props}
      logo={
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Adecco_logo.svg/800px-Adecco_logo.svg.png"
          className="img"
        />
      }
      className=.stepone-ui"
    />
  );
};

test('splash screen component should render', () => {
  const component = renderer.create(<SplashScreenTest data-testid="splash-screen" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('splash screen component without test id should render', () => {
  const component = renderer.create(<SplashScreenTest />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('splash screen accent component should render', () => {
  const component = renderer.create(<SplashScreenTest data-testid="splash-screen" accent />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('splash screen accent component on mobile should render', () => {
  // eslint-disable-next-line no-global-assign
  window = Object.assign(window, {innerWidth: 600});
  const component = renderer.create(<SplashScreenTest data-testid="splash-screen" accent />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('splash screen image component should render', () => {
  const component = renderer.create(<SplashScreenTest data-testid="splash-screen" image={backgroundImageURI} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('splash screen video component should render', () => {
  const component = renderer.create(<SplashScreenTest data-testid="splash-screen" video={backgroundVideoURI} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('splash screen with logo object', () => {
  const component = renderer.create(<SplashScreenTestLogoObject />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('splash screen with logo object', () => {
  const component = renderer.create(<SplashScreenTestLogoObject data-testid="splash-screen" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('splash screen with logo object and image', () => {
  const component = renderer.create(<SplashScreenTestLogoObject image={backgroundImageURI} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('splash screen with logo object and video', () => {
  const component = renderer.create(<SplashScreenTestLogoObject video={backgroundVideoURI} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

describe('test resize in splash screen', () => {
  test('small screen', async () => {
    window.innerWidth = 600;
    window.innerHeight = 600;
    fireEvent(window, new Event('resize'));

    const {queryAllByTestId} = render(<SplashScreenTest data-testid="splash-screen" />);
    expect(queryAllByTestId('splash-screen').length).toBe(1);
  });
  test('big screen', async () => {
    window.innerWidth = 1000;
    window.innerHeight = 1000;
    const {queryAllByTestId} = render(<SplashScreenTest data-testid="splash-screen" />);
    fireEvent(window, new Event('resize'));

    expect(queryAllByTestId('splash-screen').length).toBe(0);
  });
  test('small screen', async () => {
    window.innerWidth = 600;
    const {queryAllByTestId} = render(<SplashScreenTest data-testid="splash-screen" />);
    expect(queryAllByTestId('splash-screen').length).toBe(1);
  });
  test('splash screen with icon component', () => {
    const component = renderer.create(<SplashScreen data-testid="splash-screen" logo={<div>icon</div>} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('splash screen with component icon and no data-testid', () => {
    const component = renderer.create(<SplashScreen logo="string" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
