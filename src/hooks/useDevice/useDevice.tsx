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
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth <= 672);
  const [isTablet, setIsTablet] = useState(typeof window !== "undefined" && window.innerWidth <= 1024);
  const [isDesktop, setIsDesktop] = useState((typeof window !== "undefined" && window.innerWidth > 1024) ?? true);

  const handleResize = () => {
    if (typeof window !== "undefined" && window.innerWidth <= 672) {
      setIsMobile(true);
      setIsTablet(false);
      setIsDesktop(false);
    } else if (typeof window !== "undefined" && window.innerWidth <= 1024) {
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
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      window.addEventListener("orientationchange", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  return { isMobile, isTablet, isDesktop };
};
