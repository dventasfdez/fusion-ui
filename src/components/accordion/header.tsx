import clsx from "clsx";
import { useAccordion } from "./accordion";
import { ButtonHTMLAttributes } from "react";

/**
 * AccordionHeader is the interactive trigger controlling the parent
 * `Accordion` open/closed state. Applies proper ARIA bindings.
 */
const AccordionHeader: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  const { parentId, showContent, toggleContent } = useAccordion();

  return (
    <button
      className={clsx("accordion-header", className)}
      onClick={toggleContent}
      {...props}
      id={`${parentId}-btn`}
      aria-expanded={showContent}
      aria-controls={`${parentId}-content`}
    >
      {children}
    </button>
  );
};

export default AccordionHeader;
