import { createContext, useContext, useEffect, useRef, useState } from "react";

export { default as AccordionContent } from "./accordionContent";
export { default as AccordionHeader } from "./accordionHeader";

const AccordionContext = createContext({});
export interface IAccordionProps {
  /**
   * Identifies the accordion item
   */
  id?: string;
  /**
   * Add shadow box to accordion
   */
  filled?: boolean;
  /**
   * Indicates if the accordion show the content
   */
  defaultShow?: boolean;
  /**
   * Add class to accordion
   */
  className?: string;
  onClick?: () => void;
  [others: string]: any;
}

interface IAccordionContext {
  parentId: string;
  showContent: boolean;
  toggleContent: () => void;
}

const Accordion: React.FC<IAccordionProps> = ({ id, filled, defaultShow = false, children, className, onClick, ...rest }) => {
  const accordionRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(defaultShow);

  const handleClickOutside = (event: MouseEvent) => {
    if (event && event.target && showContent && accordionRef && accordionRef.current) {
      const _el = event.target as HTMLElement;
      const _accordion = accordionRef.current;

      if (_accordion.parentElement?.className.includes("accordion-group")) {
        if (!_accordion.contains(_el) && _el.parentNode?.parentNode === _accordion.parentNode && _el.className.includes("accordion")) setShowContent(false);
      }
    }
  };

  useEffect(() => {
    if (showContent && typeof document !== "undefined") {
      document.addEventListener("click", handleClickOutside);
      return () => {
        return document.removeEventListener("click", handleClickOutside);
      };
    }
  });

  useEffect(() => {
    if (defaultShow !== showContent) setShowContent(defaultShow);
  }, [defaultShow]);

  const toggleContent = () => {
    setShowContent((prev) => !prev);
    if (typeof onClick === "function") onClick();
  };

  return (
    <AccordionContext.Provider value={{ parentId: id ?? "acc", showContent, toggleContent }}>
      <div ref={accordionRef} id={id} className={`accordion${filled ? "_filled" : ""} ${className ?? ""}`} {...rest}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

export default Accordion;

/**
 *
 * @internal
 */
export const useAccordion = () => useContext(AccordionContext) as IAccordionContext;
