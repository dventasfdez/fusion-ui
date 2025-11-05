import clsx from "clsx";
import { useAccordion } from "./accordion";
import { DetailedHTMLProps, HTMLAttributes } from "react";

const AccordionContent: React.FC<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = ({ children, className, ...props }) => {
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
