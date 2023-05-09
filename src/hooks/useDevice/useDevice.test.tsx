import {render} from '@testing-library/react';
import React from 'react';
import {useDevice} from './useDevice';
const TestUseDevice = () => {
  const {isDesktop, isMobile, isTablet} = useDevice();
  return (
    <div>
      <div>isDesktop: {isDesktop ? 'true' : 'false'}</div>
      <div>isMobile: {isMobile ? 'true' : 'false'}</div>
      <div>isTablet: {isTablet ? 'true' : 'false'}</div>
    </div>
  );
};

describe('useDevice', () => {
  it('should be defined', () => {
    expect(useDevice).toBeDefined();
  });
  it('should return isDesktop, isMobile, isTablet', () => {
    const {container} = render(<TestUseDevice />);
    expect(container).toMatchSnapshot();
  });
  it('should return isDesktop, isMobile, isTablet', () => {
    Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 1024});
    const {container} = render(<TestUseDevice />);
    expect(container).toMatchSnapshot();
    Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 672});
    const {container: container2} = render(<TestUseDevice />);
    expect(container2).toMatchSnapshot();
    Object.defineProperty(window, 'innerWidth', {writable: true, configurable: true, value: 1025});
    const {container: container3} = render(<TestUseDevice />);
    expect(container3).toMatchSnapshot();
  });
});
