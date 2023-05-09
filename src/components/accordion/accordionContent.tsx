import { useAccordion } from "./accordion";

export interface IAccordionContentProps {
  /**
   * Add class to accordion content
   */
  className?: string;
  [others: string]: any;
}

const AccordionContent: React.FC<IAccordionContentProps> = (props) => {
  const { showContent } = useAccordion();
  const { children, className, ...rest } = props;

  return showContent ? (
    <div className={`accordion-content ${className || ""}`} {...rest}>
      {children}
    </div>
  ) : null;
};

export default AccordionContent;
