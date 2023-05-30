import { useAccordion } from "./accordion";

export interface IAccordionHeaderProps {
  /**
   * Add class to accordion header
   */
  className?: string;
  [others: string]: any;
}

const AccordionHeader: React.FC<IAccordionHeaderProps> = (props) => {
  const { showContent, toggleContent } = useAccordion();
  const { children, className, ...rest } = props;

  return (
    <div className={`accordion-header ${className ?? ""}`} onClick={toggleContent} {...rest}>
      {children}
      {showContent ? <span className="material-icons accordion-icon">expand_less</span> : <span className="material-icons accordion-icon">expand_more</span>}
    </div>
  );
};

export default AccordionHeader;
