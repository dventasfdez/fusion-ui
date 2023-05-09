import { useEffect, useState } from "react";

export interface IUseDevice {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

/**
 *
 * @internal
 */
export const useDevice = (): IUseDevice => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 672);
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  const handleResize = () => {
    if (window.innerWidth <= 672) {
      setIsMobile(true);
      setIsTablet(false);
      setIsDesktop(false);
    } else if (window.innerWidth <= 1024) {
      setIsMobile(false);
      setIsTablet(true);
      setIsDesktop(false);
    } else {
      setIsMobile(false);
      setIsTablet(false);
      setIsDesktop(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return { isMobile, isTablet, isDesktop };
};
