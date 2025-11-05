import clsx from "clsx";
import { useAccordion } from "./accordion";

export interface IAccordionContentProps {
  /**
   * Add class to accordion content
   */
  className?: string;
  [others: string]: any;
}

const AccordionContent: React.FC<IAccordionContentProps> = ({
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
