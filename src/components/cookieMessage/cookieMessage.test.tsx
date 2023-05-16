import React, {useState} from 'react';
import CookieMessage, {
  CookieMessageBody,
  CookieMessageFooter,
  CookieMessageHeader,
  CookieMessageRight,
  CookieMoreInfo,
} from './../cookieMessage/cookieMessage';
import renderer from 'react-test-renderer';
import {fireEvent, render} from '@testing-library/react';

const CookieTest = (args?: any) => {
  const [moreInfo, setMoreInfo] = useState(false);
  return (
    <div className=.stepone-ui">
      <CookieMessage className={args?.className} moreInfo={moreInfo} onToggleMoreInfo={args?.onToggleMoreInfo}>
        <CookieMessageHeader className={args?.headerClassName} data-testid="header-test">
          Header
        </CookieMessageHeader>
        <CookieMessageBody className={args?.bodyClassName} data-testid="body-test">
          We use cookies on our website. By clicking “Accept all” you agree to the storing of cookies on your device to
          Improve the performance of our site, to enhance functionality and personalisation, analyse site usage and assist in
          our marketing efforts. By clicking “Strictly Necessary” you only agree to the storing of strictly necessary cookies
          in your device. No other cookies will be used. Do note however that selecting this option may result in a less
          optimised browsing experience. For more information please see our Cookie Policy.
        </CookieMessageBody>
        <CookieMessageFooter className={args?.footerClassName} data-testid="footer-test">
          <a data-testid="moreinfo-button" onClick={() => setMoreInfo(true)}>
            More Information
          </a>
        </CookieMessageFooter>
        <CookieMessageRight className={args?.rightClassName} data-testid="right-test">
          <button>si</button>
          <button onClick={() => setMoreInfo(true)}>no</button>
        </CookieMessageRight>
        <CookieMoreInfo className={args?.moreInfoClassName} data-testid="moreinfo-test">
          More Content
        </CookieMoreInfo>
      </CookieMessage>
    </div>
  );
};

it('render and match snapshot', () => {
  const component = renderer.create(<CookieTest />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('render with className', () => {
  const {getByTestId} = render(<CookieTest className="className" headerClassName="className" />);
  const header = getByTestId('header-test');
  expect(header.classList.contains('className')).toBeTruthy();
});
it('render header with className', () => {
  const {getByTestId} = render(<CookieTest headerClassName="className" />);
  const header = getByTestId('header-test');
  expect(header.classList.contains('className')).toBeTruthy();
});

it('render body with className', () => {
  const {getByTestId} = render(<CookieTest bodyClassName="className" />);
  const body = getByTestId('body-test');
  expect(body.classList.contains('className')).toBeTruthy();
});

it('render footer with className', () => {
  const {getByTestId} = render(<CookieTest footerClassName="className" />);
  const footer = getByTestId('footer-test');
  expect(footer.classList.contains('className')).toBeTruthy();
});

it('render more info with className', () => {
  const {getByTestId} = render(<CookieTest moreInfoClassName="className" />);
  const moreinfoButton = getByTestId('moreinfo-button');
  fireEvent.click(moreinfoButton);
  const moreinfo = getByTestId('moreinfo-test');
  expect(moreinfo.classList.contains('className')).toBeTruthy();
});

it('render right with className', () => {
  const {getByTestId} = render(<CookieTest rightClassName="className" />);
  const right = getByTestId('right-test');
  expect(right.classList.contains('className')).toBeTruthy();
});

it('open onToggleMoreInfo (non-function) info content', () => {
  const onToggleMoreInfo = '5';
  const {getByTestId} = render(<CookieTest onToggleMoreInfo={onToggleMoreInfo} />);
  const moreinfoButton = getByTestId('moreinfo-button');
  fireEvent.click(moreinfoButton);
  const closeButton = document.querySelector('.cookie-message-back-button');
  if (closeButton) fireEvent.click(closeButton);
  expect(onToggleMoreInfo).toBe('5');
});

it('close more info content', () => {
  const onToggleMoreInfo = jest.fn();
  const {getByTestId} = render(<CookieTest onToggleMoreInfo={onToggleMoreInfo} />);
  const moreinfoButton = getByTestId('moreinfo-button');
  fireEvent.click(moreinfoButton);
  const closeButton = document.querySelector('.cookie-message-back-button');
  if (closeButton) fireEvent.click(closeButton);
  expect(onToggleMoreInfo).toBeCalled();
});
