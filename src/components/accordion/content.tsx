import clsx from "clsx";
import { useAccordion } from "./accordion";
import { HTMLAttributes } from "react";

/**
 * AccordionContent reveals or hides its children based on the parent
 * `Accordion` state. Handles ARIA attributes and data-state.
 */
const AccordionContent: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const { parentId, showContent } = useAccordion();

  return (
    <div
      className={clsx(
        "accordion-content",
        {
          hidden: !showContent,
        },
        className
      )}
      {...props}
      id={`${parentId}-content`}
      aria-labelledby={`${parentId}-btn`}
      aria-hidden={!showContent}
      data-state={showContent ? "open" : "closed"}
    >
      {children}
    </div>
  );
};

export default AccordionContent;
