import clsx from "clsx";
import {
  createContext,
  DetailedHTMLProps,
  HTMLAttributes,
  useContext,
  useEffect,
  useRef,
  useState,
  MouseEvent,
} from "react";

export { default as AccordionContent } from "./content";
export { default as AccordionHeader } from "./header";
export { default as AccordionGroup } from "./group";

const AccordionContext = createContext({});
type AccordionProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  /**
   * Add shadow box to accordion
   */
  filled?: boolean;
  /**
   * Indicates if the accordion show the content
   */
  defaultShow?: boolean;
};

interface IAccordionContext {
  parentId: string;
  showContent: boolean;
  toggleContent: () => void;
}

const Accordion: React.FC<AccordionProps> = ({
  id,
  filled,
  defaultShow = false,
  children,
  className,
  onClick,
  ...props
}) => {
  const accordionRef = useRef<HTMLDivElement>(null);
  const [showContent, setShowContent] = useState(defaultShow);

  useEffect(() => {
    if (defaultShow !== showContent) setShowContent(defaultShow);
  }, [defaultShow]);

  const toggleContent = (e: MouseEvent<HTMLDivElement>) => {
    setShowContent((prev) => !prev);
    if (typeof onClick === "function") onClick(e);
  };

  return (
    <AccordionContext.Provider
      value={{ parentId: id ?? "acc", showContent, toggleContent }}
    >
      <div
        ref={accordionRef}
        id={id}
        className={clsx(
          { accordion: !filled, accordion_filled: filled },
          className
        )}
        {...props}
      >
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
export const useAccordion = () =>
  useContext(AccordionContext) as IAccordionContext;
