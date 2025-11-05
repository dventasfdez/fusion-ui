import clsx from "clsx";
import { useAccordion } from "./accordion";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

const AccordionHeader: React.FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, className, ...props }) => {
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
