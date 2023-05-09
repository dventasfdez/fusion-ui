import React from 'react';
import Footer, {FooterBottom, FooterBrand, FooterHeader, FooterLogo} from './footer';
import renderer from 'react-test-renderer';
import {render} from '@testing-library/react';
import {fireEvent, waitFor} from '@testing-library/dom';

const footerExample = (props?: any) => {
  return (
    <Footer>
      <FooterHeader>
        <div>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
          <a href="#">Link</a>
        </div>
      </FooterHeader>
      <FooterBottom>
        <FooterLogo data-testid="footer-logo-test">
          <img
            style={{objectFit: 'contain'}}
            alt="footer-logo"
            src="https://www-prd-amz930-com.azureedge.net/es-es/-/media/project/adeccogroup/horizontal-the-adecco-group-brand-mark-land-rgb.png?h=475&w=1385&modified=00010101000000&hash=950A28C29AD61BBB9CB374DA671A06D1"
          />
        </FooterLogo>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <FooterBrand data-testid="footer-brand-test">
          <p>@brand2022</p>
        </FooterBrand>
      </FooterBottom>
    </Footer>
  );
};

test('Footer should render', () => {
  const component = renderer.create(footerExample());
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Display footer with logo', () => {
  const {getByTestId} = render(footerExample());
  const logo = getByTestId('footer-logo-test');
  expect(logo).toBeDefined();
});

test('Display footer with brand', () => {
  const {getByTestId} = render(footerExample());
  const brand = getByTestId('footer-brand-test');
  expect(brand).toBeDefined();
});

test('Display footer without children', () => {
  // @ts-expect-error No children
  const _ = render(<Footer />);
  expect(_).toBeDefined();
});
